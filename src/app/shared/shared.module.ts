import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { WindowFirstCharComponent } from './window-first-char/window-first-char.component';

@NgModule({
  declarations: [UserDetailsComponent, WindowFirstCharComponent],
  imports: [CommonModule],
  exports: [
    FormsModule,
    UserDetailsComponent,
    WindowFirstCharComponent,
    CommonModule,
  ],
})
export class SharedModule {}
