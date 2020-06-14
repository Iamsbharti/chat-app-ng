import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
import { Toaster, ToastConfig } from 'ngx-toast-notifications';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public firstname: string;
  public lastname: string;
  public email: string;
  public mobile: string;
  public password: string;
  public apiKey: string;

  constructor(
    private userService: UsermanagementService,
    private toaster: Toaster,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  //call signup user service
  public signUpUser(): any {
    let newUser = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      mobile: this.mobile,
      password: this.password,
      apiKey: this.apiKey,
    };

    this.userService.signUpRoute(newUser).subscribe(
      (data) => {
        //console.log(data);
        this.toaster.open({ text: data.message, type: 'success' });
        setTimeout(() => this._router.navigate(['login']), 2000);
      },
      (error) => {
        console.warn(error.message);
        this.toaster.open({ text: error.message, type: 'danger' });
      }
    );
  }
}
