import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Cookie } from 'ng2-cookies';
import { UsermanagementService } from 'src/app/user/usermanagement.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public userInfo: object;
  public authToken: string;

  constructor(
    private socketService: ChatService,
    private userServices: UsermanagementService,
    private _router: Router
  ) {
    console.log('chat');
  }

  ngOnInit(): void {
    //get auth user's info from cookies and localstorage
    this.userInfo = this.userServices.getAuthUserInfo();
    this.authToken = Cookie.get('authToken');
    console.log(this.userInfo);
    this.checkAuthStatus();
    this.verifyUserAuthentication();
    this.getOnlineUsersList();
  }
  public getOnlineUsersList() {
    throw new Error('Method not implemented.');
  }
  public checkAuthStatus() {
    if (
      this.authToken === '' ||
      this.authToken === null ||
      this.authToken === undefined
    ) {
      this._router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
  public verifyUserAuthentication() {
    throw new Error('Method not implemented.');
  }
}
