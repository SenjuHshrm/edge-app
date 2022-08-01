import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LoadingComponent } from './loading/loading.component';
import { CreateInquiryComponent } from './modals/create-inquiry/create-inquiry.component';
import { ViewInquiryComponent } from './modals/view-inquiry/view-inquiry.component';
import { CreateQuotationComponent } from './modals/create-quotation/create-quotation.component';
import { ViewQuotationComponent } from './modals/view-quotation/view-quotation.component';
import { ViewPurchaseOrderComponent } from './modals/view-purchase-order/view-purchase-order.component';
import { CreatePurchaseOrderComponent } from './modals/create-purchase-order/create-purchase-order.component';
import { CreateBookingComponent } from './modals/create-booking/create-booking.component';
import { CreateCustomerComponent } from './modals/create-customer/create-customer.component';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { CreateItemComponent } from './modals/create-item/create-item.component';
import { CreateBundleComponent } from './modals/create-bundle/create-bundle.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    CreateInquiryComponent,
    ViewInquiryComponent,
    CreateQuotationComponent,
    ViewQuotationComponent,
    ViewPurchaseOrderComponent,
    CreatePurchaseOrderComponent,
    CreateBookingComponent,
    CreateCustomerComponent,
    BarChartComponent,
    LineChartComponent,
    CreateItemComponent,
    CreateBundleComponent,
  ],
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  exports: [
    ButtonComponent,
    InputComponent,
    LoadingComponent,
    CreateInquiryComponent,
    ViewInquiryComponent,
    CreateQuotationComponent,
    ViewQuotationComponent,
    ViewPurchaseOrderComponent,
    CreatePurchaseOrderComponent,
    CreateBookingComponent,
    CreateCustomerComponent,
    BarChartComponent,
    LineChartComponent,
  ],
})
export class ComponentsModule {}
