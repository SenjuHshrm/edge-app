import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeAll(() => {
    localStorage.setItem('ACCESS', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWlkIiwiYWNjZXNzIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.OEUHeHv1V01XbH3pWLyq0vOOyS01KvZ3P5MigTyUP8Q")
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
          },
          {
            path: 'booking-list',
            loadChildren: () => import('./booking-list/booking-list.module').then((m) => m.BookingListModule)
          },
          {
            path: 'inquiry-list',
            loadChildren: () => import('./inquiry-list/inquiry-list.module').then((m) => m.InquiryListModule)
          },
          {
            path: 'quotation-list',
            loadChildren: () => import('./quotation-list/quotation-list.module').then((m) => m.QuotationListModule)
          },
          {
            path: 'purchase-order',
            loadChildren: () => import('./purchase-order/purchase-order.module').then((m) => m.PurchaseOrderModule)
          },
          {
            path: 'key-partners',
            loadChildren: () => import('./key-partners/key-partners.module').then((m) => m.KeyPartnersModule)
          },
          {
            path: 'report',
            loadChildren: () => import('./report/report.module').then((m) => m.ReportModule)
          },
          {
            path: 'acct-request',
            loadChildren: () => import('./acct-request/acct-request.module').then((m) => m.AcctRequestModule)
          },
          {
            path: 'inventory',
            loadChildren: () => import('./inventory/inventory.module').then((m) => m.InventoryModule)
          },
          {
            path: 'settings',
            loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
          },
          {
            path: 'soa',
            loadChildren: () => import('./soa/soa.module').then((m) => m.SoaModule)
          },
          {
            path: 'coa-nda',
            loadChildren: () => import('./coa-nda/coa-nda.module').then((m) => m.CoaNdaModule)
          },
          {
            path: 'rts',
            loadChildren: () => import('./rts/rts.module').then((m) => m.RtsModule)
          },
          
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    localStorage.removeItem('ACCESS')
  })
});
