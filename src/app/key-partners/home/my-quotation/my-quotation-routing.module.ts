import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyQuotationComponent } from './my-quotation.component';

const routes: Routes = [{ path: '', component: MyQuotationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyQuotationRoutingModule { }
