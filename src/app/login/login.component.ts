import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TokenService} from '../core/token.service';
import {Router} from '@angular/router';
import {NotificationService} from '../core/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private router: Router, private notificationService: NotificationService, private tokenService: TokenService) {
  }

  ngOnInit() {
  }

  submit() {
    if (!(this.userName.valid && this.password.valid)) {
      this.notificationService.addNotification('用户名和密码不能为空', 'error');
      return;
    }
    this.loading = true;
    this.tokenService.auth(this.userName.value, this.password.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      () => {
        this.notificationService.addNotification('登录失败, 请稍后重试', 'error');
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
