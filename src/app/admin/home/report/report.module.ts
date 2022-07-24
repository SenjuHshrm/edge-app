import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ComponentsModule,
    NgApexchartsModule,
  ],
})
export class ReportModule {}
