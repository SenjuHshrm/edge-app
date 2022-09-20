import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { KeyPartnersComponent } from './key-partners.component';

describe('KeyPartnersComponent', () => {
  let component: KeyPartnersComponent;
  let fixture: ComponentFixture<KeyPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPartnersComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
          },
          {
            path: 'register',
            loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)
          },
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
