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
import { ClassificationUpdateComponent } from './modals/codes-update/classification-update/classification-update.component';
import { PipesModule } from '../pipes/pipes.module';
import { UpdateCustomerComponent } from './modals/codes-update/update-customer/update-customer.component';
import { ViewItemComponent } from './modals/inventory/view-item/view-item.component';
import { UpdateItemComponent } from './modals/inventory/update-item/update-item.component';
import { SetKeypartnerPasswordComponent } from './modals/set-keypartner-password/set-keypartner-password.component';
import { ViewBundleComponent } from './modals/bundles/view-bundle/view-bundle.component';
import { UpdateBundleComponent } from './modals/bundles/update-bundle/update-bundle.component';
import { AssignCodeComponent } from './modals/assign-code/assign-code.component';
import { UpdateKeypartnerComponent } from './modals/update-keypartner/update-keypartner.component';
import { SelectKeypartnerComponent } from './modals/select-keypartner/select-keypartner.component';
import { ViewByIdComponent } from './modals/bundles/view-by-id/view-by-id.component';

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
    ClassificationUpdateComponent,
    UpdateCustomerComponent,
    ViewItemComponent,
    UpdateItemComponent,
    SetKeypartnerPasswordComponent,
    ViewBundleComponent,
    UpdateBundleComponent,
    AssignCodeComponent,
    UpdateKeypartnerComponent,
    SelectKeypartnerComponent,
    ViewByIdComponent
  ],
  imports: [CommonModule, FormsModule, NgApexchartsModule, PipesModule],
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
    SetKeypartnerPasswordComponent,
    AssignCodeComponent
  ],
})
export class ComponentsModule {}
