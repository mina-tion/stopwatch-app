import { Component, OnInit } from '@angular/core';
import { interval, VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  title = 'stopwatch-app';

  min: any = '0' + 0;
  sec: any = '0' + 0;

  startTimer: any;
  isRunning: boolean = false

  start(): void { 
    if(!this.isRunning) { 
      this.isRunning = true;
      this.startTimer = setInterval(()=>{ 
        this.sec++;
        this.sec = this.sec<10?0+this.sec:this.sec
        if(this.sec === 60)
        { 
          this.min++;
          this.min = this.min<10?0+this.min:this.min
          this.sec = '0' + 0
        }
      })
    } else this.stop();
  }

  stop(): void { 
    clearInterval(this.startTimer);
    this.isRunning = false;
  }
  /* ngOnInit(): void {
    const obj$ = interval(1000)
    obj$.subscribe((d:any)=>{
      console.log(d)
      this.data = d
    })
  } */
}
