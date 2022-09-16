import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBookingComponent } from './upload-booking.component';

describe('UploadBookingComponent', () => {
  let component: UploadBookingComponent;
  let fixture: ComponentFixture<UploadBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
