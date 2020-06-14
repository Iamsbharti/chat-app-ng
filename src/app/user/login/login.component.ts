import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
import { Routes, Router } from '@angular/router';
import { Toaster, ToastConfig } from 'ngx-toast-notifications';
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
      (data) => {
        //console.log(data);
        this.loginResponse = data.message;
        this.toaster.open({ text: data.message, type: 'success' });
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
