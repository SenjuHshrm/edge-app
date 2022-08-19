import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtsRoutingModule } from './rts-routing.module';
import { RtsComponent } from './rts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RtsComponent],
  imports: [CommonModule, RtsRoutingModule, FormsModule],
})
export class RtsModule {}
