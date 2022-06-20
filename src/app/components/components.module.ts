import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { FlashMsgComponent } from './flash-msg/flash-msg.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    FlashMsgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    FlashMsgComponent
  ]
})
export class ComponentsModule { }
