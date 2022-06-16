import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'partial'
      }, {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'booking',
        loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)
      }, {
        path: 'coa-nda',
        loadChildren: () => import('./coa-nda/coa-nda.module').then(m => m.CoaNdaModule)
      }, {
        path: 'my-quotation',
        loadChildren: () => import('./my-quotation/my-quotation.module').then(m => m.MyQuotationModule)
      }, {
        path: 'create-purchase-order',
        loadChildren: () => import('./create-purchase-order/create-purchase-order.module').then(m => m.CreatePurchaseOrderModule)
      }, {
        path: 'my-customer',
        loadChildren: () => import('./my-customer/my-customer.module').then(m => m.MyCustomerModule)
      }, {
        path: 'my-inventory',
        loadChildren: () => import('./my-inventory/my-inventory.module').then(m => m.MyInventoryModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }