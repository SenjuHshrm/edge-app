import { ReactiveFormsModule } from '@angular/forms';
import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, ComponentsModule, ReactiveFormsModule],
})
export class RegisterModule {}
