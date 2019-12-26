import { Component, OnInit } from '@angular/core';
import { interval, range } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  progress: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.progress = 0;
    const _timer = interval(30);
    const _stop = _timer.pipe(filter((val) => val > 100));
    
    _timer.pipe(takeUntil(_stop))
          .subscribe(
            (val) => this.progress = val,
            (error) => console.log(error),
            () => {
              this.router.navigate(['/editor']);
            }
          );
  }

}
