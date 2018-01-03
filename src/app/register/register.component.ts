import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from './register.service';
import {NotificationService} from '../core/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private router: Router, private notificationService: NotificationService, private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  submit() {
    if (!(this.userName.valid && this.password.valid)) {
      this.notificationService.addNotification('用户名和密码不能为空', 'error');
      return;
    }
    this.loading = true;
    this.registerService.register(this.userName.value, this.password.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      () => {
        this.notificationService.addNotification('注册失败, 请稍后重试', 'error');
        this.loading = false;
      }
    );
  }

  getUserNameErrorMessage(): String {
    return this.userName.hasError('required') ? 'You must enter a user name' : '';
  }

  getPasswordErrorMessage(): String {
    return this.password.hasError('required') ? 'You must enter a password' : '';
  }

}
