import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sun-travel-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() placeholder:string;
  @Input() errorMessage:string;
  @Input() control:FormControl;
  @Input() title:string;
  @Input() type:string;
  @Input() prependText:string;
  @Input() prependMatIcon:string;
  @Input() isDisabled:Boolean;
  @Input() options: [{key:string,value:any}]
  constructor() { }

  ngOnInit(): void {
  }


  getStatus(){
    return this.control.value!=null && this.control.touched && this.control.invalid
  }
}
