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
    CreateCustomerComponent
  ],
  imports: [
    CommonModule
  ],
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
    CreateCustomerComponent
  ]
})
export class ComponentsModule { }
