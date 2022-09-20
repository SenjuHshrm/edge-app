import { ComponentsModule } from './../../../components/components.module';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { BarChartComponent } from './../../../components/bar-chart/bar-chart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeAll(() => {
    localStorage.setItem('ACCESS', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWlkIiwiYWNjZXNzIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.OEUHeHv1V01XbH3pWLyq0vOOyS01KvZ3P5MigTyUP8Q")
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent, BarChartComponent, ChartComponent ],
      imports: [HttpClientTestingModule, NgApexchartsModule, ComponentsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
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
