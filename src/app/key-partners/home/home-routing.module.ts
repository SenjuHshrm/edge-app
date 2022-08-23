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
        title: 'EdgeCommerce | Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'booking',
        title: 'EdgeCommerce | My Booking',
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'my-coa-nda',
        title: 'EdgeCommerce | My COA / NDA',
        loadChildren: () =>
          import('./coa-nda/coa-nda.module').then((m) => m.CoaNdaModule),
      },
      {
        path: 'inquiry',
        title: 'EdgeCommerce | My Inquiry',
        loadChildren: () =>
          import('./inquiry/inquiry.module').then((m) => m.InquiryModule),
      },
      {
        path: 'my-quotation',
        title: 'EdgeCommerce | My Quotation',
        loadChildren: () =>
          import('./my-quotation/my-quotation.module').then(
            (m) => m.MyQuotationModule
          ),
      },
      {
        path: 'create-purchase-order',
        title: 'EdgeCommerce | Create Purchase Order',
        loadChildren: () =>
          import('./create-purchase-order/create-purchase-order.module').then(
            (m) => m.CreatePurchaseOrderModule
          ),
      },
      {
        path: 'my-customer',
        title: 'EdgeCommerce | My Customer',
        loadChildren: () =>
          import('./my-customer/my-customer.module').then(
            (m) => m.MyCustomerModule
          ),
      },
      {
        path: 'my-inventory',
        title: 'EdgeCommerce | My Inventory',
        loadChildren: () =>
          import('./my-inventory/my-inventory.module').then(
            (m) => m.MyInventoryModule
          ),
      },
      {
        path: 'profile',
        title: 'EdgeCommerce | Profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'my-soa',
        title: 'EdgeCommerce | My SOA',
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
