import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public userInfo;
  public message: string = 'saurabh';
  constructor(private socketService: ChatService) {
    console.log('chat');
  }

  ngOnInit(): void {
    this.userInfo = Cookie.get('authToken');
    console.log(this.userInfo);
  }
}
