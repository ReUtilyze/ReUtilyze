import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRedeemPointsComponent } from './customer-redeem-points.component';

describe('CustomerRedeemPointsComponent', () => {
  let component: CustomerRedeemPointsComponent;
  let fixture: ComponentFixture<CustomerRedeemPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRedeemPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRedeemPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
