import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyInventoryComponent } from './my-inventory.component';

const routes: Routes = [{ path: '', component: MyInventoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInventoryRoutingModule { }
