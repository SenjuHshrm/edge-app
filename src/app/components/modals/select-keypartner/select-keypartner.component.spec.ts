import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKeypartnerComponent } from './select-keypartner.component';

describe('SelectKeypartnerComponent', () => {
  let component: SelectKeypartnerComponent;
  let fixture: ComponentFixture<SelectKeypartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectKeypartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectKeypartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
