import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyPartnersComponent } from './key-partners.component';

const routes: Routes = [{ path: '', component: KeyPartnersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyPartnersRoutingModule { }
