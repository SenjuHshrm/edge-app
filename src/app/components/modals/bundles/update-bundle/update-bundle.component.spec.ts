import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBundleComponent } from './update-bundle.component';

describe('UpdateBundleComponent', () => {
  let component: UpdateBundleComponent;
  let fixture: ComponentFixture<UpdateBundleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBundleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
