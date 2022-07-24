import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySoaComponent } from './my-soa.component';

describe('MySoaComponent', () => {
  let component: MySoaComponent;
  let fixture: ComponentFixture<MySoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
