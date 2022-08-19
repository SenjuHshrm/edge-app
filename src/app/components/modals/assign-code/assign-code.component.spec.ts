import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCodeComponent } from './assign-code.component';

describe('AssignCodeComponent', () => {
  let component: AssignCodeComponent;
  let fixture: ComponentFixture<AssignCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
