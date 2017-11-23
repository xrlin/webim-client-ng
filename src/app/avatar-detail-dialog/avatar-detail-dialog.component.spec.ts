import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvatarDetailDialogComponent} from './avatar-detail-dialog.component';

describe('AvatarDetailDialogComponent', () => {
  let component: AvatarDetailDialogComponent;
  let fixture: ComponentFixture<AvatarDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarDetailDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
