import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySoaComponent } from './my-soa.component';

const routes: Routes = [{ path: '', component: MySoaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySoaRoutingModule { }
