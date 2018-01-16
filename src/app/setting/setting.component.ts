import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../models/user.model';
import {UserService} from '../core/user.service';
import {HttpResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../core/notification.service';

// noinspection UnterminatedStatementJS
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: User;

  passwordForm: FormGroup;

  displayPasswordForm = false;

  constructor(private userService: UserService, private notificationService: NotificationService, @Inject(FormBuilder) fb: FormBuilder) {
    this.userService.currentUser.subscribe((u: User) => this.user = u);
    this.passwordForm = fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  updateName = (name: string) => {
    this.userService.updateUserName(name).subscribe({
      error: err => this.notificationService.addNotification('Update user name failed', 'error')
    });
  }

  updatePassword = ({oldPassword, newPassword}) => {
    this.userService.updatePassword(oldPassword, newPassword).subscribe({
      next: (resp: HttpResponse<{ message: string }>) => {
        this.notificationService.addNotification(resp.body.message, 'success');
      },
      error: err => this.notificationService.addNotification('update password failed', 'error')
    });
  }

  updateAvatar(blob: Blob) {
    this.userService.updateAvatar(blob).subscribe(
      () => {
        this.userService.retrieveProfile();
      },
      () => {
        this.notificationService.addNotification('上传头像失败', 'error');
      });
  }

  ngOnInit() {
  }

  togglePasswordForm() {
    this.displayPasswordForm = !this.displayPasswordForm;
  }

  submitPassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.updatePassword(this.passwordForm.value);
    this.passwordForm.reset();
    this.togglePasswordForm();
  }

}
