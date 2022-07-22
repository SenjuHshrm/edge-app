import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'booking-list', loadChildren: () => import('./booking-list/booking-list.module').then(m => m.BookingListModule) },
      { path: 'inquiry-list', loadChildren: () => import('./inquiry-list/inquiry-list.module').then(m => m.InquiryListModule) },
      { path: 'quotation-list', loadChildren: () => import('./quotation-list/quotation-list.module').then(m => m.QuotationListModule) },
      { path: 'purchase-order', loadChildren: () => import('./purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule) },
      { path: 'key-partners', loadChildren: () => import('./key-partners/key-partners.module').then(m => m.KeyPartnersModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'acct-request', loadChildren: () => import('./acct-request/acct-request.module').then(m => m.AcctRequestModule) },
      { path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
