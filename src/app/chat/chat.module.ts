import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [ChatBoxComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent, pathMatch: 'full' },
    ]),
  ],
  providers: [ChatService],
})
export class ChatModule {}
