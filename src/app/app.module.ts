import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    ChatModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastNotificationsModule.forRoot({
      duration: 2000,
      type: 'primary',
      autoClose: true,
      position: 'top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
