import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Cookie } from 'ng2-cookies';
import { UsermanagementService } from 'src/app/user/usermanagement.service';
import { Router } from '@angular/router';
import { ToastConfig, Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
})
export class ChatBoxComponent implements OnInit {
  public userInfo: any;
  public authToken: string;
  public disconnectedSocket: boolean;
  public onlineUsers: any;
  public showOnlineUsers = false;
  public messageText: string;
  public messageList = [];
  public scrollToTop: boolean = true;
  public recieverId: string;
  public recieverName: string;
  constructor(
    private socketService: ChatService,
    private userServices: UsermanagementService,
    private _router: Router,
    private toaster: Toaster
  ) {}

  ngOnInit(): void {
    //get auth user's info from cookies and localstorage
    this.userInfo = this.userServices.getAuthUserInfo();
    this.authToken = Cookie.get('authToken');

    this.showOnlineUsers = false;
    this.checkAuthStatus();
    this.verifyUserAuthentication();
    this.getOnlineUsersList();
  }
  //check user's login status
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
  //verify the user with authToken
  public verifyUserAuthentication(): any {
    this.socketService.verifyUser().subscribe((data) => {
      this.disconnectedSocket = false;
      this.socketService.setUserEvent(this.authToken);
      this.getOnlineUsersList();
    });
  }
  //get the onlineuserList
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
      //console.log('online users', this.onlineUsers);
    });
  }
  public toggleShow(): any {
    this.showOnlineUsers = this.showOnlineUsers ? false : true;
  }
  //send message on enter press
  public sendChatMessage: any = (event: any) => {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  };
  public sendMessage: any = () => {
    let { firstName, lastName, userId } = this.userInfo;
    if (this.messageText) {
      let messageObject = {
        sendName: firstName + ' ' + lastName,
        senderId: userId,
        receiverName: '',
        receiverId: '',
        message: this.messageText,
        createdOn: new Date(),
      };
      this.socketService.sendChatMessage(messageObject);
      this.pushToChatWindow(messageObject);
    } else {
      this.toaster.open({ text: 'can not empty message', type: 'danger' });
    }
  };
  //display chat in chat window
  public pushToChatWindow: any = (message) => {
    this.messageText = '';
    this.messageList.push(message);
    this.scrollToTop = false;
  };
  //recieve message
  public getMessageFromUser: any = () => {
    this.socketService
      .getChatByUserId(this.userInfo.userId)
      .subscribe((data) => {
        this.recieverId === data.senderId ? this.messageList.push(data) : '';
        this.toaster.open({ text: `${data.senderName} says ${data.message}` });
        this.scrollToTop = false;
      });
  };
}
