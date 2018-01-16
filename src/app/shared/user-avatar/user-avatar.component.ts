import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {MatDialog} from '@angular/material';
import {AvatarDetailDialogComponent} from '../../avatar-detail-dialog/avatar-detail-dialog.component';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;
  @Input() bgColor: string;
  @Input() fgColor: string;

  constructor(public dialog: MatDialog) {
    this.bgColor = this.bgColor || 'white';
    this.fgColor = this.fgColor || '#6692ff';
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(AvatarDetailDialogComponent, {
      data: {user: this.user}
    });
  }

}
