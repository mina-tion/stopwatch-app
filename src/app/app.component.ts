import { Component, OnInit } from '@angular/core';
import { interval, fromEvent, debounceTime, race } from 'rxjs';
import { buffer,filter, map, bufferCount, first, repeat } from 'rxjs/operators';

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

  doubleClickDuration = 500;


  ngOnInit(): void {
    this.isRunning = false;

      const debounce$ = this.onWait$
          .pipe(debounceTime(this.doubleClickDuration));

     const clickLimit$ = this.onWait$
          .pipe(bufferCount(2),);
          
     const bufferGate$ = race(debounce$, clickLimit$)
          .pipe(
            first(),
            repeat(),
          );
    this.onWait$
          .pipe(
            buffer(bufferGate$),
            map(clicks => clicks.length),
            filter(len => len ===2 )
          ).subscribe(() => this.wait());   
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

  wait(): void {
    if (this.isRunning) {
       this.isRunning = false;
       if (this.startTimer) {
        this.startTimer.unsubscribe();
      }
    }
  }
  reset(): void {
    this.resetVars();
    this.start()
  }

  resetVars(): void {
    this.sec = '0' + 0;
    this.min = '0' + 0;
  }
}
