import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsermanagementService } from './usermanagement.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'signup', component: SignupComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [UsermanagementService],
})
export class UserModule {}
