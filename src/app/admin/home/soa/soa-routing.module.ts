import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoaComponent } from './soa.component';

const routes: Routes = [{ path: '', component: SoaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoaRoutingModule { }
