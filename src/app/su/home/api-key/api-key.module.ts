import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiKeyRoutingModule } from './api-key-routing.module';
import { ApiKeyComponent } from './api-key.component';
import { ShowKeyComponent } from './show-key/show-key.component';
import { NewClientComponent } from './new-client/new-client.component';


@NgModule({
  declarations: [
    ApiKeyComponent,
    ShowKeyComponent,
    NewClientComponent
  ],
  imports: [
    CommonModule,
    ApiKeyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ApiKeyModule { }
