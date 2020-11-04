import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sun-travel-input-text-area',
  templateUrl: './input-text-area.component.html',
  styleUrls: ['./input-text-area.component.scss']
})
export class InputTextAreaComponent implements OnInit {


  @Input() placeholder:string;
  @Input() errorMessage:string;
  @Input() control:FormControl;
  @Input() title:string;
  @Input() isDisabled:Boolean;
  @Input() rowsInput:number;

  constructor() { }

  ngOnInit(): void {
  }  

  getStatus(){
    return this.control.value!=null && this.control.touched && this.control.invalid
  }

}
