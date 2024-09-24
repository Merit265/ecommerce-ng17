import { Component, inject } from '@angular/core';

import {
  concatMap,
  delay,
  distinct,
  distinctUntilChanged,
  filter,
  from,
  map,
  mergeAll,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchMap,
  timer,
} from 'rxjs';
import { PlaceholderService } from '../placeholder.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  constructor(private req: PlaceholderService) {}

  url = of('https://loremflickr.com/420/340/');

  words = of(
    { name: 'red' ,delay : 1000},
    { name: 'paris'  ,delay : 100},
    { name: 'london' ,delay : 5000 },
    { name: 'heart' ,delay : 300 },
    { name: 'dark' ,delay : 200},
    { name: 'welcome' ,delay : 1000 }
  );


  imgs:any = [];
  userData = of({ id: 1, name: 'ahmed' });

  ngOnInit(): void {
    this.words
      .pipe(
        concatMap((words:any) => {
          return this.url.pipe( 
            delay(words.delay) ,
            map((url) => { 
              return url + words.name;
            })
          )
        })
      )
      .subscribe({
        next: (data:any) => {
          console.log(data);

          this.imgs.push(data);
        },
      });



  }
}
