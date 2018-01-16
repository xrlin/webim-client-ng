import {AfterViewInit, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import * as Cropper from 'cropperjs';

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
  @Output() afterCropped = new EventEmitter<Blob>();

  constructor(private dialog: MatDialog) {
  }

  openDialog(data: CropperSourceData) {
    const dialogRef = this.dialog.open(AvatarCropperDialogComponent, {data});
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        const croppedData = dialogRef.componentInstance.croppedData;
        this.afterCropped.emit(croppedData);
      }
    });
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

  croppedData: Blob;

  constructor(@Inject(MAT_DIALOG_DATA) public data?: CropperSourceData) {
  }

  ngOnInit() {
    const image = document.getElementById('avatar-cropper-source') as HTMLImageElement;
    if (this.data) {
      image.src = this.data.blobUrl;
    }
    this.cropper = new Cropper(image, {});
  }

  cropped() {
    this.cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      this.croppedData = blob;
    });
  }

}
