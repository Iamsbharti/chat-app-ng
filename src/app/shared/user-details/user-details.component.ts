import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor() {}
  @Input() userFirstName: any;
  @Input() userLastName: String;
  @Input() userStatus: String;
  @Input() messageRead: String;
  @Input() userBg: String;
  @Input() userColor: String;

  public firstChar: String;

  ngOnInit(): void {
    this.firstChar = this.userFirstName[0];
  }
}
