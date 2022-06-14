import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuotationComponent } from './my-quotation.component';

describe('MyQuotationComponent', () => {
  let component: MyQuotationComponent;
  let fixture: ComponentFixture<MyQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
