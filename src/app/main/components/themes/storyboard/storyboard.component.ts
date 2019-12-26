import { Component, OnInit } from '@angular/core';
import { StoryService } from 'src/app/services/story.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-storyboard',
  templateUrl: './storyboard.component.html',
  styleUrls: ['./storyboard.component.scss']
})
export class StoryboardComponent implements OnInit {

  stories = [];

  selected: number;

  storySubscription: Subscription;

  constructor(private storyService: StoryService) {
  }

  ngOnInit() {
    this.storySubscription = this.storyService.getAll().subscribe(response => {
      this.stories = response.data;
    });
    this.selected = this.storyService.getCurrent();
  }

  onStorySelect(id) {
    this.selected = id;
    this.storyService.setCurrent(id);

    for (const story of this.stories) {
      if (story._id === id) {
        this.storyService.setCurrentStory(story);
        break;
      }
    }
  }

}
