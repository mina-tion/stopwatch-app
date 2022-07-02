import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, debounceTime } from 'rxjs';
import { delay, buffer, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stopwatch-app';

  min: any = '0' + 0;
  sec: any = '0' + 0;

  startTimer: any;
  isRunning: boolean = false;
  timeCounter$ = interval(1000);

  resetButton = document.getElementsByClassName('btn-wait');
  onWait$ = fromEvent(this.resetButton, 'click');

  ngOnInit(): void {
    this.isRunning = false;
    this.onWait$
      .pipe(
        buffer(this.onWait$.pipe(debounceTime(500))),
        map(clickArray=>clickArray.length),
        filter((len) => len === 2)
      )
      .subscribe((event) => this.wait());

      this.onWait$.pipe(
      delay(1000))
      .subscribe(suggestion => {
        console.log('suggestion');
      });  
  }
  wait(): void {
    console.log('Double Click!');
    if (this.isRunning) {
      console.log('wait');
    }
  }

  start(): void {
    console.log('START TIMER, isrun = ', this.isRunning);
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTimer = this.timeCounter$.subscribe((sec: any) => {
        this.sec++;
        this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
        if (this.sec === 60) {
          this.min++;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }
      });
    }
  }

  stop(): void {
    this.resetVars();
    this.isRunning = false;
    if (this.startTimer) {
      this.startTimer.unsubscribe();
    }
  }

  reset(): void {
    this.resetVars();
  }

  resetVars(): void {
    this.sec = '0' + 0;
    this.min = '0' + 0;
  }
}
