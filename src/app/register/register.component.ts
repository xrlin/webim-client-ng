import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {RegisterService} from './register.service';

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

  constructor(private router: Router, private snackBar: MatSnackBar, private registerService: RegisterService) {
  }

  ngOnInit() {
  }

  submit() {
    if (!(this.userName.valid && this.password.valid)) {
      this.showErrorSnackBar('用户名和密码不能为空');
      return;
    }
    this.loading = true;
    this.registerService.register(this.userName.value, this.password.value).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      () => {
        this.showErrorSnackBar('注册失败, 请稍后重试');
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

  private showErrorSnackBar(message: string) {
    this.snackBar.open(
      message,
      '关闭',
      {duration: 2000, verticalPosition: 'top', panelClass: 'snack-bar--error'}
    );
  }

}
