import {
  Component,
  OnInit,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-window-first-char',
  templateUrl: './window-first-char.component.html',
  styleUrls: ['./window-first-char.component.css'],
})
export class WindowFirstCharComponent implements OnInit {
  //define the component inputs
  @Input() name: String;
  @Input() userColor: String;
  @Input() userbg: String;

  //component will emit
  @Output()
  notify: EventEmitter<String> = new EventEmitter<String>();

  public firstChar: String;
  public _name: any;

  constructor() {}

  ngOnInit(): void {
    this._name = this.name;
    this.firstChar = this._name[0];
  }

  //will modify the first char based on changes from parent component
  ngOnChange(changes: SimpleChanges) {
    let name = changes.name;
    this._name = name.currentValue;
    this.firstChar = this._name[0];
  }
  //will emit the name (reciever) to be toasted in parent
  public currentUserClick(): any {
    this.notify.emit(this._name);
  }
}
