import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import * as Cropper from 'cropperjs';
import {UserService} from '../core/user.service';
import {NotificationService} from '../core/notification.service';

interface CropperSourceData {
  blobUrl: string;
}

@Component({
  selector: 'app-avatar-cropper',
  templateUrl: './avatar-cropper.component.html',
  styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperComponent implements OnInit, AfterViewInit {

  input: HTMLInputElement;

  constructor(private dialog: MatDialog) {
  }

  openDialog(data: CropperSourceData) {
    const dialogRef = this.dialog.open(AvatarCropperDialogComponent, {data});
    dialogRef.afterClosed().subscribe(() => this.input.value = '');
  }

  ngOnInit() {
  }

  // trigger the click event on file input element
  selectFile() {
    this.input.click();
  }

  ngAfterViewInit() {
    this.input = document.getElementById('input-avatar') as HTMLInputElement;
    this.input.onchange = () => {
      const files = this.input.files;
      if (!(files && files.length > 0)) {
        return;
      }
      const file = files[0];
      // only manage image file
      if (!/^(image\/*)/.test(file.type)) {
        return;
      }
      const blobUrl = URL.createObjectURL(file);
      this.openDialog(<CropperSourceData>{blobUrl});
    };
  }

}

@Component({
  selector: 'app-avatar-cropper-dialog',
  templateUrl: './avatar-cropper-dialog.component.html',
  styleUrls: ['./avatar-cropper.component.scss']
})
export class AvatarCropperDialogComponent implements OnInit {
  cropper: Cropper;

  uploading = false;

  constructor(public dialogRef: MatDialogRef<AvatarCropperDialogComponent>,
              private userService: UserService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data?: CropperSourceData) {
  }

  ngOnInit() {
    const image = document.getElementById('avatar-cropper-source') as HTMLImageElement;
    if (this.data) {
      image.src = this.data.blobUrl;
    }
    this.cropper = new Cropper(image, {});
  }

  upload() {
    this.cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      this.uploading = true;
      this.userService.updateAvatar(blob).subscribe(
        () => {
          this.dialogRef.close();
          this.uploading = false;
          this.userService.retrieveProfile();
        },
        () => {
          this.notificationService.addNotification('上传头像失败', 'error');
          this.uploading = false;
        });
    });
  }

}
