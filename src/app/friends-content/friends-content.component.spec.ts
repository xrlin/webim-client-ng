import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FriendsContentComponent} from './friends-content.component';

describe('FriendsContentComponent', () => {
  let component: FriendsContentComponent;
  let fixture: ComponentFixture<FriendsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendsContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
