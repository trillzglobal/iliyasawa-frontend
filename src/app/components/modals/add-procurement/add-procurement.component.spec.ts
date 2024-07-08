import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcurementComponent } from './add-procurement.component';

describe('AddProcurementComponent', () => {
  let component: AddProcurementComponent;
  let fixture: ComponentFixture<AddProcurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProcurementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
