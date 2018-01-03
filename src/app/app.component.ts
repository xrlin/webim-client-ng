import {Component, OnInit} from '@angular/core';
import {NotificationService, SystemNotification} from './core/notification.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.notificationService.notification.subscribe(
      (notification: SystemNotification) => {
        const panelClass = notification.status === 'error' ? 'snack-bar--error' : 'snack-bar--success';
        this.snackBar.open(
          notification.message,
          '关闭',
          {duration: 2000, verticalPosition: 'top', panelClass: panelClass});
      }
    );
  }
}
