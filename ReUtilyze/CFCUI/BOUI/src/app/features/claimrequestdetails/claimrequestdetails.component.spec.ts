import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimrequestdetailsComponent } from './claimrequestdetails.component';

describe('ClaimrequestdetailsComponent', () => {
  let component: ClaimrequestdetailsComponent;
  let fixture: ComponentFixture<ClaimrequestdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimrequestdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimrequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
