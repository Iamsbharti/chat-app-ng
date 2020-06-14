import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
import { Routes, Router } from '@angular/router';
import { Toaster, ToastConfig } from 'ngx-toast-notifications';
import { Cookie } from 'ng2-cookies';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public loginResponse: string;
  constructor(
    private userService: UsermanagementService,
    private toaster: Toaster,
    private _Router: Router
  ) {}

  ngOnInit(): void {}

  //login
  public loginUser(): any {
    let userInfo = {
      email: this.email,
      password: this.password,
    };
    this.userService.loginRoute(userInfo).subscribe(
      (response) => {
        //console.log(data);
        //set display message
        this.loginResponse = response.message;

        //set cookies
        let { email, userId, firstName, lastName } = response.data.userDetails;
        let { authToken } = response.data;
        Cookie.set('email', email);
        Cookie.set('userId', userId);
        Cookie.set('authToken', authToken);
        Cookie.set('name', firstName + ' ' + lastName);

        //set in localstorage
        this.userService.setAuthUserInfo(response.data.userDetails);

        //invoke toaster
        this.toaster.open({ text: response.message, type: 'success' });

        //redirect post login
        setTimeout(() => this._Router.navigate(['/chat']), 3000);
      },
      (error) => {
        console.warn(error.message);
        console.log(error);
        this.loginResponse = error.error.message;
        this.toaster.open({ text: error.error.message, type: 'danger' });
      }
    );
  }
}
