import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  texts = [
    'Funny Grass Thong Sandals Feature',
    '1. Shock absorbing sandals with contoured compression molded EVA foam foot bed.',
    '2. Herringbone rubber out sole gives you durable strong traction control.',
    '3. These flips are lightweight, durable, odor-resistant, easy to clean with soap and water, and quick to dry.',
    '4. Great for everyday wear or for an eye-catching adornment at the beach this summer. Trick your toes into feeling the summer vibes with grass in between them.',
    '5. Grass Flip Flops also make a great gift idea for men, women and kids.'
  ]

  constructor() { }

  ngOnInit() {
  }

}
