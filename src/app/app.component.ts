import { Component, OnInit } from '@angular/core';
import { interval, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
 
  title = 'stopwatch-app';

  min: any = '0' + 0;
  sec: any = '0' + 0;

  startTimer: any;
  isRunning: boolean = false;
  timeCounter$ = interval(1000);
 
  ngOnInit(): void {
    this.isRunning = false; 
    
  }  

  start(): void { 
    console.log('START TIMER, isrun = ', this.isRunning)
    if(!this.isRunning) { 
      this.isRunning = true;
      this.startTimer = this.timeCounter$.subscribe((sec:any)=> {
        console.log(sec)
        this.sec++
        this.sec = this.sec < 10 ? "0" + this.sec : this.sec
          if(this.sec === 60)
          { 
            this.min++;
            this.min = this.min < 10 ? "0" + this.min : this.min
            this.sec = '0' + 0
          }
      })
    }
  }

  stop(): void { 
    this.sec = '0' + 0; 
    this.isRunning = false;
    this.startTimer.unsubscribe()
  }

  reset(): void { 
    /* this.sec = '0' + 0; 
    this.isRunning = false;
    this.startTimer.unsubscribe() */
  }
}
