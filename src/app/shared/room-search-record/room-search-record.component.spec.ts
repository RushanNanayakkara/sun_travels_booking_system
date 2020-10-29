import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSearchRecordComponent } from './room-search-record.component';

describe('RoomSearchRecordComponent', () => {
  let component: RoomSearchRecordComponent;
  let fixture: ComponentFixture<RoomSearchRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomSearchRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSearchRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
