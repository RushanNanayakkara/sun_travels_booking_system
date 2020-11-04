import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRecordComponent } from './reservation-record.component';

describe('ReservationRecordComponent', () => {
  let component: ReservationRecordComponent;
  let fixture: ComponentFixture<ReservationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
