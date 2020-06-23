import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { ChatService } from './chat.service';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from '../../app/shared/user-details/user-details.component';
import { RemoveSpecialCharPipe } from '../customPipe/remove-special-char.pipe';

@NgModule({
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [ChatService],
})
export class ChatModule {}
