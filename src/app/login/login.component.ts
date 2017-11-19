import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {TokenService} from '../core/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private router: Router, private snackBar: MatSnackBar, private tokenService: TokenService) {
  }

  ngOnInit() {
  }

  submit() {
    if (!(this.userName.valid && this.password.valid)) {
      this.showErrorSnackBar('用户名和密码不能为空');
      return;
    }
    this.loading = true;
    this.tokenService.auth(this.userName.value, this.password.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      () => {
        this.showErrorSnackBar('登录失败, 请稍后重试');
        this.loading = false;
      }
    );
  }

  getUserNameErrorMessage(): String {
    return this.userName.hasError('required') ? 'You must enter a user name' : '';
  }

  private showErrorSnackBar(message: string) {
    this.snackBar.open(
      message,
      '关闭',
      {duration: 2000, verticalPosition: 'top', panelClass: 'snack-bar--error'}
    );
  }

}
