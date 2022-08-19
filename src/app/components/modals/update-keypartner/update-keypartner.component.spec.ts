import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKeypartnerComponent } from './update-keypartner.component';

describe('UpdateKeypartnerComponent', () => {
  let component: UpdateKeypartnerComponent;
  let fixture: ComponentFixture<UpdateKeypartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateKeypartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateKeypartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
