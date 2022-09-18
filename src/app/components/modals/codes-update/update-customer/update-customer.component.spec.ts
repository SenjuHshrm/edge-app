import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCustomerComponent } from './update-customer.component';

const sampleData = {
  addr: {
    brgy: "SAN ROQUE",
    city: "SAN PABLO CITY",
    hsStNum: "45, Purok 3",
    province: "LAGUNA"
  },
  contact: "09100000000",
  createdAt: "2022-09-18T06:45:56.082Z",
  deletedAt: "",
  name: "Sample Customer",
  keyPartnerId: "sample_key_partner_id",
  _id: "6326bea43b49919cc6084c34"
}

describe('UpdateCustomerComponent', () => {
  let component: UpdateCustomerComponent;
  let fixture: ComponentFixture<UpdateCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustomerComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerComponent);
    component = fixture.componentInstance;
    component.data = sampleData
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
