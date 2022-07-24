import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoaNdaComponent } from './coa-nda.component';

const routes: Routes = [{ path: '', component: CoaNdaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoaNdaRoutingModule { }
