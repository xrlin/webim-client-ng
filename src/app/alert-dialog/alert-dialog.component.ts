import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface AlertDialogData {
  message: string;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const alertData = this.data as AlertDialogData;
    this.message = alertData.message;
  }

  ngOnInit() {
  }

}
