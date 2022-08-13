import { AdminAuthGuard } from './../../guard/admin-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Edge Commerce | Dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'booking-list',
        title: 'Edge Commerce | Booking List',
        loadChildren: () =>
          import('./booking-list/booking-list.module').then(
            (m) => m.BookingListModule
          ),
      },
      {
        path: 'inquiry-list',
        title: 'Edge Commerce | Inquiries',
        loadChildren: () =>
          import('./inquiry-list/inquiry-list.module').then(
            (m) => m.InquiryListModule
          ),
      },
      {
        path: 'quotation-list',
        title: 'Edge Commerce | Quotations',
        loadChildren: () =>
          import('./quotation-list/quotation-list.module').then(
            (m) => m.QuotationListModule
          ),
      },
      {
        path: 'purchase-order',
        title: 'Edge Commerce | Purchase Order',
        loadChildren: () =>
          import('./purchase-order/purchase-order.module').then(
            (m) => m.PurchaseOrderModule
          ),
      },
      {
        path: 'key-partners',
        title: 'Edge Commerce | Key Partners',
        loadChildren: () =>
          import('./key-partners/key-partners.module').then(
            (m) => m.KeyPartnersModule
          ),
      },
      {
        path: 'report',
        title: 'Edge Commerce | Reports',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'acct-request',
        title: 'Edge Commerce | Account Request',
        loadChildren: () =>
          import('./acct-request/acct-request.module').then(
            (m) => m.AcctRequestModule
          ),
      },
      {
        path: 'inventory',
        title: 'Edge Commerce | Inventory',
        loadChildren: () =>
          import('./inventory/inventory.module').then((m) => m.InventoryModule),
      },
      {
        path: 'settings',
        title: 'Edge Commerce | Settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'soa',
        title: 'Edge Commerce | SOA',
        loadChildren: () => import('./soa/soa.module').then((m) => m.SoaModule),
      },
      {
        path: 'coa-nda',
        title: 'Edge Commerce | COA/NDA',
        loadChildren: () =>
          import('./coa-nda/coa-nda.module').then((m) => m.CoaNdaModule),
      },
      {
        path: 'rts',
        title: 'Edge Commerce | Return to Seller',
        loadChildren: () => import('./rts/rts.module').then((m) => m.RtsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
