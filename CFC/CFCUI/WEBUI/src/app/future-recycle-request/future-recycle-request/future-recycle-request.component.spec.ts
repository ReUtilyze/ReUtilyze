import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureRecycleRequestComponent } from './future-recycle-request.component';

describe('FutureRecycleRequestComponent', () => {
  let component: FutureRecycleRequestComponent;
  let fixture: ComponentFixture<FutureRecycleRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureRecycleRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureRecycleRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
