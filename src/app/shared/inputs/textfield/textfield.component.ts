import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() type: String;
  @Input() placeholder:string;
  @Output() event = new EventEmitter<String>();

  inputText:String;

  constructor() {
  }

  ngOnInit(): void {
  }

  emitText(event:Event):void{
    this.event.emit(this.inputText);
  }

}
