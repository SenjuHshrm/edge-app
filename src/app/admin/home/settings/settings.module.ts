import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, ComponentsModule, ReactiveFormsModule],
})
export class SettingsModule {}
