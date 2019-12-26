import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands: any;

  selected: number;

  brandSubscription: Subscription;

  constructor(private brandService: BrandService) {
    this.selected = 2;
  }

  ngOnInit() {
    this.brandSubscription = this.brandService.getAll().subscribe(response => {
      this.brands = response.data;
      console.log(response.data);
    });
    this.selected = this.brandService.getCurrent();
  }

  onStyleSelect(id) {
    this.selected = id;
    this.brandService.setCurrent(id);

    for (const brand of this.brands) {
      if (brand._id === id) {
        this.brandService.setCurrentBrand(brand);
        break;
      }
    }
  }

  OnDestroy() {
    this.brandSubscription.unsubscribe();
  }

}
