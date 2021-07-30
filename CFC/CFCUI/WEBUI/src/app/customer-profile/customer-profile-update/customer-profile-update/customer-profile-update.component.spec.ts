import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileUpdateComponent } from './customer-profile-update.component';

describe('CustomerProfileUpdateComponent', () => {
  let component: CustomerProfileUpdateComponent;
  let fixture: ComponentFixture<CustomerProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProfileUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
