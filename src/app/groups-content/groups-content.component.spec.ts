import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupsContentComponent} from './groups-content.component';

describe('GroupsContentComponent', () => {
  let component: GroupsContentComponent;
  let fixture: ComponentFixture<GroupsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
