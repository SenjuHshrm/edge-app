import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';

import { BarChartComponent } from './bar-chart.component';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeAll(() => {
    localStorage.setItem('ACCESS', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWlkIiwiYWNjZXNzIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.OEUHeHv1V01XbH3pWLyq0vOOyS01KvZ3P5MigTyUP8Q")
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartComponent, ChartComponent ],
      imports: [HttpClientTestingModule, NgApexchartsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
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
