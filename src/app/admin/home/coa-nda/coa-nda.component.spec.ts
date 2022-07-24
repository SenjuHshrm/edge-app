import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaNdaComponent } from './coa-nda.component';

describe('CoaNdaComponent', () => {
  let component: CoaNdaComponent;
  let fixture: ComponentFixture<CoaNdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaNdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoaNdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
