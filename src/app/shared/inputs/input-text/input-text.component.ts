import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sun-travel-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit,OnDestroy {

  @Input() placeholder:string;
  @Input() errorMessage:string;
  @Input() control:FormControl;
  @Input() title:string;
  @Input() type:string;
  @Input() prependText:string;
  @Input() prependMatIcon:string;
  @Input() isDisabled:Boolean;
  subscriptions:Subscription[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.control.valueChanges.subscribe(()=>{
        if(this.type=='number' && typeof this.control.value!=='number'){
          this.control.setValue(Number(this.control.value));
        } 
      })
    );
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  getStatus(){
    return this.control.value!=null && this.control.touched && this.control.invalid
  }


}
