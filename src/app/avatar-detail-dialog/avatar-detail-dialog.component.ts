import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../models/user.model';

@Component({
  selector: 'app-avatar-detail-dialog',
  templateUrl: './avatar-detail-dialog.component.html',
  styleUrls: ['./avatar-detail-dialog.component.scss']
})
export class AvatarDetailDialogComponent implements OnInit {

  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = this.data.user as User;
  }

  ngOnInit() {
  }

}
