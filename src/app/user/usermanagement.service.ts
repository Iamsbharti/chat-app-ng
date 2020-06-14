import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsermanagementService {
  //initialize
  public baseUrl = 'https://chatapi.edwisor.com/api/v1/users';
  public authToken =
    'YTczZjFhODdlZWU5ODg1Mzg5MzNkNWQ3M2UxZWU2OGI4YWI3YTE4ODNkZTQwZDBiZWI4MDc0NjA2ODU4NGE2ZTExNTFjZjRmYjBjNmZmNmE3M2NmNTZiMDBjNGE3N2RlZDI5MjI1Njg4NzE3ZmMxY2VlZmEwNGFkYjg2YWQ4NDRhYQ==';

  constructor(private _http: HttpClient) {}
  //handle exceptions
  public handleError(error: HttpErrorResponse) {
    console.log('Http error', error.message);
    return Observable.throw(error.message);
  }
  //signup
  public signUpRoute(newUser): any {
    //console.log('signup api call', newUser);
    //console.log('url', `${this.baseUrl}/signup?apiKey=${this.authToken}`);
    let signUpResponse = this._http.post(
      `${this.baseUrl}/signup?authToken=${this.authToken}`,
      newUser
    );
    return signUpResponse;
  }
  //login
  public loginRoute(loginInfo): any {
    //console.log(loginInfo);
    let loginResponse = this._http.post(
      `${this.baseUrl}/login?authToken=${this.authToken}`,
      loginInfo
    );
    return loginResponse;
  }
  //set Authenticated user info
  public setAuthUserInfo(data): any {
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  //get Authenticated user info
  public getAuthUserInfo(): any {
    return JSON.parse(localStorage.getItem('userInfo'));
  }
}
