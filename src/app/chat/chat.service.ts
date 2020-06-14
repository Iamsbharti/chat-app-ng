import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError, observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socketUrl = 'https://chatapp.edwisor.com/';
  private socket;
  constructor(private _httpk: HttpClient) {
    //a handshake with server socket and client is now ready to listen for events
    this.socket = io(this.socketUrl);
  }

  //event Listeners
  /**
   * verifyUser event for authentication--listen to the event and get the data and pass it
   * on to the subscriber at component
   */
  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      });
    });
  };

  /**
   * Listen to online-user-list event and pass the data returned to the subscriber of
   * Obervable
   */
  public getOnlineUsersList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      });
    });
  };
  /**
   * Listen to disconnect event
   */
  public disconnect = () => {
    return Observable.create((observer) => {
      this.socket.on('disconnect', () => {
        observer.next();
      });
    });
  };
  //emitt event
  /**
   * Emitt set-user event and send authToken
   */
  public setUserEvent = (authToken) => {
    this.socket.emit('set-user', authToken);
  };
}
