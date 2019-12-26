import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  texts = [
    'MORYSONG MEn WOmen Summer Beach Flip Flops Casual Grass Lawn Simulation Sandals',
    'Lug Sole sole',
    '【SOFT MATERIAL】PVC, EVA outsole, with simulation lawn. Made with imported synthetic material. VERY SOFT, Will NOT HURT FEET.',
    '【STURDY & ANTI-SKIDDING FEATURES】Anti-aging and ozone resistance is good. With high density, high elastic anti-skidding sole, no glue, light not only, more wear-resisting.',
    '【SIMULATION GRASS】Excellent and creative simulation lawn design, easily be eye-catcher of the crowd. Brings cool and refreshing in summer.',
    `【UNISEX & AGE INDEPENDENT】No matter men, women, boys or girls, all of you can wear this funny simulation flip flops. US Little Kid's foot length of size US2-8.3''-21cm / US3.5-8.6''-22cm / US4.5-9''-23cm. Women's foot length of US7-9.4''-26cm / US8-9.8''-25cm / US8.5-10.2''-26cm. Men's foot length of US9-10.6''- 27cm/ US10-11''-28cm / US11-11.4''-29cm.`,
    '【PERFECT FOR OUTDOOR OCCASION】Suitable for leisure casual occasions, such as beach, pool, barbecue, picnic and other outdoor activities. Easy to wear.'
  ];

  constructor() { }

  ngOnInit() {
  }

}
