import { Component, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/services/widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templates: any = [
    {
      link: '/',
      src: 'assets/graphics/widget-logo.svg',
      text: 'Brand Credits',
      data: {}
    },
    {
      link: '/',
      src: 'assets/graphics/widget-rating.svg',
      text: 'Customer Rating',
      data: {}
    },
    {
      link: '/',
      src: 'assets/graphics/widget-feedback.svg',
      text: 'User feedback',
      data: {}
    },
    {
      link: '/',
      src: 'assets/graphics/widget-cover.svg',
      text: 'Cover',
      data: {}
    }
  ];

  logoSubscription: Subscription;
  coverSubscription: Subscription;

  constructor(
    private widgetService: WidgetService
  ) { }

  ngOnInit() {
    this.logoSubscription = this.widgetService.getLogo().subscribe(response => {
      console.log(response.data);
      this.templates[0].data = response.data;
    });
    this.coverSubscription = this.widgetService.getCover().subscribe(response => {
      this.templates[3].data = response.data;
    })
  }

  OnDestroy() {
    this.logoSubscription.unsubscribe();
    this.coverSubscription.unsubscribe();
  }

}
