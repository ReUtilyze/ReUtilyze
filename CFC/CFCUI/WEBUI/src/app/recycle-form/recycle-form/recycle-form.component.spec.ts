import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleFormComponent } from './recycle-form.component';

describe('RecycleFormComponent', () => {
  let component: RecycleFormComponent;
  let fixture: ComponentFixture<RecycleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecycleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
