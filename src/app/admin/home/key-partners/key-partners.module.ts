import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeyPartnersRoutingModule } from './key-partners-routing.module';
import { KeyPartnersComponent } from './key-partners.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [KeyPartnersComponent],
  imports: [
    CommonModule,
    KeyPartnersRoutingModule,
    ComponentsModule,
    FormsModule,
  ],
})
export class KeyPartnersModule {}
