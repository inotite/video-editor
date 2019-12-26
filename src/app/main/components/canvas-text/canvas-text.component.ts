import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, Subscription, interval } from 'rxjs';
import { BrandService } from 'src/app/services/brand.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-canvas-text',
  templateUrl: './canvas-text.component.html',
  styleUrls: ['./canvas-text.component.scss'],
  animations: [
    trigger('slideInLeft', [
      state('initial', style({
        transform: 'translateX(-110%)',
        'padding-right': '100px',
        'margin-left': '-90px'
      })),
      state('final', style({
        transform: 'translateX(0)',
        'padding-right': '10px',
        'margin-left': '0px'
      })),
      transition('initial=>final', animate('1500ms ease-in')),
      transition('final=>initial', animate('0ms'))
    ]),
  ]
})
export class CanvasTextComponent implements OnInit {

  showBox: boolean;
  blur: boolean;
  fontSize: number;
  textColor: string;
  backgroundColor: string;
  highlightColor: string;
  fontFace: string;
  aniTime = 1.5;

  transform = 0;
  paddingRight = 10;
  marginLeft = 0;

  @HostBinding('style.align-items')
  alignItems = 'flex-start';

  @HostBinding('style.justify-content')
  justifyContent = 'flex-start';

  @ViewChild('subtitle') subtitle;

  @Input()
  item: any;
  @Input()
  event: Observable<void>;
  @Input()
  positionChange: Observable<any>;
  @Input()
  styleChange: Observable<any>;

  eventSubscription: Subscription;
  positionSubscription: Subscription;
  styleSubscription: Subscription;
  state: any;

  brandOb: Observable<any>;

  constructor( private brandService: BrandService ) {
    this.showBox = false;
    this.fontSize = 30;
  }

  ngOnInit() {
    this.onFontSizeChange(this.item.size);
    this.onAlignmentChange(this.item.position);
    this.eventSubscription = this.event.subscribe(() => {
      this.state = 'initial';
      setTimeout(() => {
        this.state = 'final';
      });
    });
    this.positionSubscription = this.positionChange.subscribe((pos) => {
      if (!pos) {
        return;
      }
      this.onAlignmentChange(pos);
    });
    this.styleSubscription = this.styleChange.subscribe((styleParam) => {
      if (!styleParam) {
        return;
      }

      this.transform = styleParam.transform;
      this.paddingRight = styleParam.paddingRight;
      this.marginLeft = styleParam.marginLeft;
    });
    this.brandOb = this.brandService.getCurrentBrand();
    this.brandOb.subscribe(response => {
      this.textColor = response.textColor;
      this.backgroundColor = response.backgroundColor;
      switch (response.fontSize) {
        case 'small':
          this.fontSize = 16;
          break;
        case 'medium':
          this.fontSize = 24;
          break;
        case 'large':
          this.fontSize = 30;
          break;
        default:
          this.fontSize = 48;
          break;
      }

      this.fontFace = response.fontFamily;

      if (this.highlightColor) {
        let inHTML = this.subtitle.nativeElement.innerHTML;
        inHTML = inHTML.replace(this.highlightColor.toLowerCase(), response.highlightColor.toLowerCase());
        this.subtitle.nativeElement.innerHTML = inHTML;
      }

      this.highlightColor = response.highlightColor;
    });
  }

  onFontSizeChange(fontSize: string) {
    switch (fontSize) {
      case 's':
        this.fontSize = 16;
        break;
      case 'm':
        this.fontSize = 24;
        break;
      case 'l':
        this.fontSize = 30;
        break;
      default:
        this.fontSize = 48;
        break;
    }
    this.item.size = fontSize;
  }

  onHighlightText(event) {
    // console.log(this.subtitle.nativeElement.);
    const sel = window.getSelection().getRangeAt(0);

    if (this.item.highlight && sel.startOffset === sel.endOffset) {
      let inHTML = this.subtitle.nativeElement.innerHTML;
      inHTML = inHTML.replace('</font>', '').replace(/<font.*>/g, '');
      this.subtitle.nativeElement.innerHTML = inHTML;
    } else {
      document.execCommand('foreColor', true, this.highlightColor);
    }

    this.item.highlight = !this.item.highlight;
  }

  onAlignmentChange(alignment: number) {
    this.item.position = alignment;
    switch (alignment) {
      case 1:
        this.justifyContent = 'flex-start';
        this.alignItems = 'flex-start';
        this.subtitle.nativeElement.style.textAlign = 'left';
        break;
      case 2:
        this.justifyContent = 'flex-start';
        this.alignItems = 'center';
        this.subtitle.nativeElement.style.textAlign = 'center';
        break;
      case 3:
        this.justifyContent = 'flex-start';
        this.alignItems = 'flex-end';
        this.subtitle.nativeElement.style.textAlign = 'right';
        break;
      case 4:
        this.justifyContent = 'center';
        this.alignItems = 'flex-start';
        this.subtitle.nativeElement.style.textAlign = 'left';
        break;
      case 5:
        this.justifyContent = 'center';
        this.alignItems = 'center';
        this.subtitle.nativeElement.style.textAlign = 'center';
        break;
      case 6:
        this.justifyContent = 'center';
        this.alignItems = 'flex-end';
        this.subtitle.nativeElement.style.textAlign = 'right';
        break;
      case 7:
        this.justifyContent = 'flex-end';
        this.alignItems = 'flex-start';
        this.subtitle.nativeElement.style.textAlign = 'left';
        break;
      case 8:
        this.justifyContent = 'flex-end';
        this.alignItems = 'center';
        this.subtitle.nativeElement.style.textAlign = 'center';
        break;
      case 9:
        this.justifyContent = 'flex-end';
        this.alignItems = 'flex-end';
        this.subtitle.nativeElement.style.textAlign = 'right';
        break;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const element = this.subtitle.nativeElement;
    const text = element.textContent || element.innerText;
    if (this.fontSize === 16) {
      return;
    }
    if (this.fontSize === 24 && text.length > 170) {
      this.onFontSizeChange('s');
    } else if ( this.fontSize === 30 && text.length > 103) {
      this.onFontSizeChange('m');
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    document.execCommand('insertHTML', false, event.clipboardData.getData('text/plain'));
  }

  onFocus(event) {
    this.showBox = true;
    this.blur = false;
  }

  onBlur(event) {
    this.blur = true;
    if (this.item.text !== this.subtitle.nativeElement.textContent) {
      this.item.text = this.subtitle.nativeElement.textContent;
    }
  }

  checkShowBox(event) {
    if (this.blur) {
      this.showBox = false;
    }
  }

  playSlideIn() {
    const progress = interval(40);
    const takeUntilFinish = progress.pipe(take((100 * this.aniTime) / 4));
    takeUntilFinish.subscribe(
      x => {

      },
      err => {},
      () => {

      }
    )
  }

  OnDestroy() {
    this.eventSubscription.unsubscribe();
    this.positionSubscription.unsubscribe();
    this.styleSubscription.unsubscribe();
  }

}
