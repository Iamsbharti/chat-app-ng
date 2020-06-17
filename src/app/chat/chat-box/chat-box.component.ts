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
  public disconnectedSocket: boolean;
  public onlineUsers: any;
  public showOnlineUsers = false;
  public firstName: string;
  public lastName: string;
  constructor(
    private socketService: ChatService,
    private userServices: UsermanagementService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //get auth user's info from cookies and localstorage
    this.userInfo = this.userServices.getAuthUserInfo();
    this.authToken = Cookie.get('authToken');
    //console.log(this.userInfo);
    this.firstName = this.userInfo['firstName'];
    this.lastName = this.userInfo['lastName'];
    this.showOnlineUsers = false;
    this.checkAuthStatus();
    this.verifyUserAuthentication();
    this.getOnlineUsersList();
  }
  public checkAuthStatus(): any {
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
  public verifyUserAuthentication(): any {
    this.socketService.verifyUser().subscribe((data) => {
      this.disconnectedSocket = false;
      this.socketService.setUserEvent(this.authToken);
      this.getOnlineUsersList();
    });
  }
  public getOnlineUsersList(): any {
    this.socketService.getOnlineUsersList().subscribe((usersList) => {
      this.onlineUsers = [];
      //console.log(usersList);
      for (let user in usersList) {
        let temp = {
          userId: user,
          name: usersList[user],
          unread: 0,
          chatting: 0,
        };
        user !== this.userInfo['userId'] ? this.onlineUsers.push(temp) : '';
      }
      console.log('online users', this.onlineUsers);
    });
  }
  public toggleShow(): any {
    this.showOnlineUsers = this.showOnlineUsers ? false : true;
  }
}
