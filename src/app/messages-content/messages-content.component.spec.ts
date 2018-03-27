import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessagesContentComponent} from './messages-content.component';

describe('MessagesContentComponent', () => {
  let component: MessagesContentComponent;
  let fixture: ComponentFixture<MessagesContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
