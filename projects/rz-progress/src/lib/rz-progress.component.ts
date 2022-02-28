import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'rzProgress',
  template: `
   <div class="progress_container">
    <div #progressDiv class="progress" [@fillanim]="{value: shouldFill, params: {progressValue2: progressValue}}"
    (@fillanim.start)="onAnimationStart($event)"
    (@fillanim.done)="onAnimationEnd($event)">
        <div *ngIf="showValue" class="percentage">{{displayValue}}%</div>
    </div>
  </div>
  `,
  styles: [
    `
    .progress_container{
      width: 100%;
      height: 20px;
      background-color: #c8c8c8;
      border-radius: 10px;
      padding: 4px;
      display: flex;
      align-items: center;
    }
    .progress{
      height: 100%;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg,rgba(194,153,5,1) 0%,rgba(246,194,20,1) 35%,rgba(255,208,50,1) 100%);
      box-shadow: 2px 1px 17px 10px #fff08433;
      border: 1px solid #e9b815;
      display: flex;
      justify-content: end;
    }
    .percentage{
      color: #950;
      font-size: smaller;
      display: flex;
      justify-content: end;
      margin: 0 20px;
      align-self: center;
    }
    `
  ],
  animations: [
    trigger('fillanim', [
      state('false', 
        style({ width: '0px' })
      ),
      state('true', 
        style({ width:  '{{progressValue2}}%' }),  {params: {progressValue2: 1}}
        ),
      transition('false => true', [
        animate('1s')
      ]), 
      transition('true => false', [
        animate('0.6s')
      ])
    ])
  ]
})
export class RzProgressComponent implements OnInit {

  shouldFill : boolean = false;
  displayValue: number = 0;
  @Input('progressValue') progressValue:number = 1;
  @Input('showValue') showValue:boolean = true;
  @ViewChild('progressDiv', {static: false}) private progressDiv!: ElementRef<HTMLDivElement>;
  constructor() { }

  ngOnInit(): void {
   
  }
  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    if (this.progressDiv){
      const rect = this.progressDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      this.shouldFill = topShown && bottomShown;
      
    }
  }

  async manageDisplayValue(IsIncrement:boolean){
    if(IsIncrement){
      this.displayValue = 0;
      let upInt = setInterval(()=>{
        if(this.displayValue < this.progressValue){
          this.displayValue++;
        }else{clearInterval(upInt)}
        
      },10)
    }
    else{
      this.displayValue = this.progressValue;
      let downInt = setInterval(()=>{
        if(this.displayValue > 0){
          this.displayValue--;
        }else{clearInterval(downInt)}
      },10)
    }
   
  
  }
  onAnimationStart(e:any){
    if(e.fromState === false){
      this.manageDisplayValue(true);
    }
    else if(e.fromState === true){
      this.manageDisplayValue(false);
    }
  }
  onAnimationEnd(e:any){
  }

}
