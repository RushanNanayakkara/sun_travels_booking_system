import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomSearchComponent } from './search-room-search.component';

describe('SearchRoomSearchComponent', () => {
  let component: SearchRoomSearchComponent;
  let fixture: ComponentFixture<SearchRoomSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRoomSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
