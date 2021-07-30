import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimrequestlistComponent } from './claimrequestlist.component';

describe('ClaimrequestlistComponent', () => {
  let component: ClaimrequestlistComponent;
  let fixture: ComponentFixture<ClaimrequestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimrequestlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
