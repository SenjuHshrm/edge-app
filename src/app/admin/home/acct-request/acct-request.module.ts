import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcctRequestRoutingModule } from './acct-request-routing.module';
import { AcctRequestComponent } from './acct-request.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AcctRequestComponent],
  imports: [CommonModule, AcctRequestRoutingModule, FormsModule],
})
export class AcctRequestModule {}
