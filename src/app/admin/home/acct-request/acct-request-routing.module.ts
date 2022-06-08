import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcctRequestComponent } from './acct-request.component';

const routes: Routes = [{ path: '', component: AcctRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcctRequestRoutingModule { }
