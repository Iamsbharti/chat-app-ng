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
  public userList = [];
  public pageValue: any;
  public loadingPreviousChat: boolean = false;
  public loadChatWindow: boolean = false;
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

    //retain recievers name,id upon page refresh
    this.recieverName = Cookie.get('recieverName');
    this.recieverId = Cookie.get('recieverId');
    //call userSelectedTochat
    /*if (
      this.recieverId !== null ||
      this.recieverId !== '' ||
      this.recieverId !== undefined
    ) {
      console.log('page refresh call');
      this.userSelectedToChat(this.recieverId, this.recieverName);
    }
    */
    console.log(this.messageList);
    this.showOnlineUsers = false;
    this.checkAuthStatus();
    this.verifyUserAuthentication();
    this.getOnlineUsersList();
    this.getMessageFromUser();
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
    if (event.keyCode !== undefined && event.keyCode === 13) {
      console.log('enter invoked', event.keyCode);
      this.sendMessage();
    }
  };
  public sendMessage: any = () => {
    console.log('sending message');
    let { firstName, lastName, userId } = this.userInfo;
    console.log(firstName, lastName, userId);
    console.log(this.messageText);
    if (this.messageText) {
      let messageObject = {
        sendName: firstName + ' ' + lastName,
        senderId: userId,
        receiverName: this.recieverName,
        receiverId: this.recieverId,
        message: this.messageText,
        createdOn: new Date(),
      };
      this.socketService.sendChatMessage(messageObject);
      this.pushToChatWindow(messageObject.message);
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
  //set reciever user i.e. user selected to chat
  public userSelectedToChat: any = (id, name) => {
    console.log('userselected', id, name);
    this.onlineUsers.map((user) => {
      user.id === id ? (user.chatting = true) : false;
    });
    //set cookies for current chatting user
    Cookie.set('recieverId', id);
    Cookie.set('recieverName', name);

    ///initialize the reciever's info
    this.recieverName = name;
    this.recieverId = id;

    //set the chatbox to empty
    this.messageList = [];

    //for pagination purpose
    this.pageValue = 0;

    //if user open up the chat window , set the message as seen
    let chatDetails = {
      userId: this.userInfo.userId,
      senderId: this.recieverId,
    };
    this.socketService.markChatAsSeen(chatDetails);

    //get the previous chat details
    this.getPreviousChatDetails();
    this.toggleChatWindow();
  };
  public getPreviousChatDetails: any = () => {
    console.log('load pre chat');
    let previousChat =
      this.messageList.length > 0 ? this.messageList.slice() : [];
    console.log('previouschat', previousChat);
    //call the paginated api
    this.socketService
      .getChatBetweenUsers(
        this.userInfo.userId,
        this.recieverId,
        this.pageValue * 10,
        this.authToken
      )
      .subscribe((paginatedChat) => {
        console.log('chat-data', Object.entries(paginatedChat.data));
        paginatedChat.status === 200
          ? this.messageList.concat(paginatedChat.data)
          : (this.messageList = previousChat) &&
            this.toaster.open({
              text: 'No Message Available',
              type: 'warning',
            });
        this.scrollToTop = false;
        console.log('fetched-chat', this.messageList);
      }),
      (error) => {
        console.warn(error.message);
        this.toaster.open({
          text: 'Error in fetching chat',
          type: 'warning',
        });
      };
  };
  //upon load privious chat details click
  public loadPreviousChat: any = () => {
    this.loadingPreviousChat = true;
    this.pageValue++;
    this.scrollToTop = true;
    this.getPreviousChatDetails();
  };
  //toogle chat window
  public toggleChatWindow: any = () => {
    this.loadChatWindow = this.loadChatWindow ? false : true;
  };
}
