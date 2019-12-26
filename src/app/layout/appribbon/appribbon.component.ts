import { Component, OnInit } from '@angular/core';
import { CanvasEditorService } from 'src/app/services/canvas-editor.service';

@Component({
  selector: 'app-ribbon',
  templateUrl: './appribbon.component.html',
  styleUrls: ['./appribbon.component.scss']
})
export class AppribbonComponent implements OnInit {

  durationText;
  duration;


  constructor(
    private canvasEditorService: CanvasEditorService
  ) { }

  ngOnInit() {
    this.canvasEditorService.getDuration().subscribe(dur => {
      this.durationText = `${(dur - dur % 60) / 60}:${dur % 60}`;
      this.duration = dur;
    });
  }

}
