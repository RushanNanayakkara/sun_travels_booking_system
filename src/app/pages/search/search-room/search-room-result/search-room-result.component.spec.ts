import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomResultComponent } from './search-room-result.component';

describe('SearchRoomResultComponent', () => {
  let component: SearchRoomResultComponent;
  let fixture: ComponentFixture<SearchRoomResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRoomResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoomResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
