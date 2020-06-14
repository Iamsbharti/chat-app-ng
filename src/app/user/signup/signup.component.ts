import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../usermanagement.service';
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

  constructor(private userService: UsermanagementService) {}

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
    console.log(newUser);
    this.userService.signUpRoute(newUser).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.warn(error.message);
      }
    );
  }
}
