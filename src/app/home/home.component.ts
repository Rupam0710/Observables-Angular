import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { Subscription, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe(count => {
    //   console.log(count);

    // })

    const customObservableInterval = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Çount is greater than 3!'));

        }
        count++;
      }, 1000)
    })

    this.firstSubscription = customObservableInterval.subscribe(data => {
      console.log(data);

    },
      error => {
        console.log(error);
        alert('Count is greater than 3')

      },
      () => {
        console.log('Completed!');

      })
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }

}
