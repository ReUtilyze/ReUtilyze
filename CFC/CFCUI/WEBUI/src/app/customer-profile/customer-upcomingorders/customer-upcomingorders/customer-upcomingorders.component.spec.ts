import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpcomingordersComponent } from './customer-upcomingorders.component';

describe('CustomerUpcomingordersComponent', () => {
  let component: CustomerUpcomingordersComponent;
  let fixture: ComponentFixture<CustomerUpcomingordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpcomingordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpcomingordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
