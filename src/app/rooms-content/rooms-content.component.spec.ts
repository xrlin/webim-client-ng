import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RoomContentComponent} from './rooms-content.component';

describe('RoomContentComponent', () => {
  let component: RoomContentComponent;
  let fixture: ComponentFixture<RoomContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoomContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
