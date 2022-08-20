import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoaNdaRoutingModule } from './coa-nda-routing.module';
import { CoaNdaComponent } from './coa-nda.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoaNdaComponent],
  imports: [CommonModule, CoaNdaRoutingModule, FormsModule],
})
export class CoaNdaModule {}
