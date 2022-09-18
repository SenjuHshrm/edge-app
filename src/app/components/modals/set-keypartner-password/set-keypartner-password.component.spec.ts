import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetKeypartnerPasswordComponent } from './set-keypartner-password.component';

describe('SetKeypartnerPasswordComponent', () => {
  let component: SetKeypartnerPasswordComponent;
  let fixture: ComponentFixture<SetKeypartnerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetKeypartnerPasswordComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetKeypartnerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
