import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKeyComponent } from './show-key.component';

describe('ShowKeyComponent', () => {
  let component: ShowKeyComponent;
  let fixture: ComponentFixture<ShowKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowKeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
