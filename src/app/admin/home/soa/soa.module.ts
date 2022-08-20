import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoaRoutingModule } from './soa-routing.module';
import { SoaComponent } from './soa.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SoaComponent],
  imports: [CommonModule, SoaRoutingModule, FormsModule],
})
export class SoaModule {}
