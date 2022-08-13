import { KeyPartnerAuthGuard } from './../../guard/key-partner-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [KeyPartnerAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Edge Commerce | Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'booking',
        title: 'Edge Commerce | My Booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'my-coa-nda',
        title: 'Edge Commerce | My COA / NDA',
        loadChildren: () =>
          import('./coa-nda/coa-nda.module').then((m) => m.CoaNdaModule),
      },
      {
        path: 'inquiry',
        title: 'Edge Commerce | My Inquiry',
        loadChildren: () =>
          import('./inquiry/inquiry.module').then((m) => m.InquiryModule),
      },
      {
        path: 'my-quotation',
        title: 'Edge Commerce | My Quotation',
        loadChildren: () =>
          import('./my-quotation/my-quotation.module').then(
            (m) => m.MyQuotationModule
          ),
      },
      {
        path: 'create-purchase-order',
        title: 'Edge Commerce | Create Purchase Order',
        loadChildren: () =>
          import('./create-purchase-order/create-purchase-order.module').then(
            (m) => m.CreatePurchaseOrderModule
          ),
      },
      {
        path: 'my-customer',
        title: 'Edge Commerce | My Customer',
        loadChildren: () =>
          import('./my-customer/my-customer.module').then(
            (m) => m.MyCustomerModule
          ),
      },
      {
        path: 'my-inventory',
        title: 'Edge Commerce | My Inventory',
        loadChildren: () =>
          import('./my-inventory/my-inventory.module').then(
            (m) => m.MyInventoryModule
          ),
      },
      {
        path: 'profile',
        title: 'Edge Commerce | Profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'my-soa',
        title: 'Edge Commerce | My SOA',
        loadChildren: () =>
          import('./my-soa/my-soa.module').then((m) => m.MySoaModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
