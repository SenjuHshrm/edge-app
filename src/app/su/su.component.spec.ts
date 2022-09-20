import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SuComponent } from './su.component';

describe('SuComponent', () => {
  let component: SuComponent;
  let fixture: ComponentFixture<SuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
          },
          {
            path: 'home',
            loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
          }
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
