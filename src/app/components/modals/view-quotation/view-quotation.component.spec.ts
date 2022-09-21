import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from './../../../pipes/pipes.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuotationComponent } from './view-quotation.component';

describe('ViewQuotationComponent', () => {
  let component: ViewQuotationComponent;
  let fixture: ComponentFixture<ViewQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuotationComponent ],
      imports: [HttpClientTestingModule, PipesModule],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
