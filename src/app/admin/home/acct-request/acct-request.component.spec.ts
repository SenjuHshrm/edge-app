import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctRequestComponent } from './acct-request.component';

describe('AcctRequestComponent', () => {
  let component: AcctRequestComponent;
  let fixture: ComponentFixture<AcctRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcctRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
