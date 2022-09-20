import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoaNdaComponent } from './coa-nda.component';

describe('CoaNdaComponent', () => {
  let component: CoaNdaComponent;
  let fixture: ComponentFixture<CoaNdaComponent>;

  beforeAll(() => {
    localStorage.setItem('ACCESS', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LWlkIiwiYWNjZXNzIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjIsInVpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCJ9.OEUHeHv1V01XbH3pWLyq0vOOyS01KvZ3P5MigTyUP8Q")
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoaNdaComponent ],
      imports: [HttpClientTestingModule, FormsModule]
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

  afterAll(() => {
    localStorage.removeItem('ACCESS')
  })
});
