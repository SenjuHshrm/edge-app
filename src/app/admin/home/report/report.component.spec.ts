import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';

import { ReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeAll(() => {
    localStorage.setItem('ACCESS', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWlkIiwiYWNjZXNzIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.OEUHeHv1V01XbH3pWLyq0vOOyS01KvZ3P5MigTyUP8Q")
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent, LineChartComponent, ChartComponent ],
      imports: [HttpClientTestingModule, NgApexchartsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportComponent);
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
