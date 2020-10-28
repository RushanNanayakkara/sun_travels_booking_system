import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() width:Number;
  @Input() height:Number;
  @Input() type: String;
  @Output() event = new EventEmitter<String>();

  inputText:String;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.height,this.width)
  }

  emitText(event:Event):void{
    this.event.emit(this.inputText);
  }

}
