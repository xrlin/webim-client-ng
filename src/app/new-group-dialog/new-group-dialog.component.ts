import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Group} from '../models/group.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupsService} from '../core/groups.service';
import {FileUploadService} from '../core/fileupload.service';
import {NotificationService} from '../core/notification.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-new-group-dialog',
  templateUrl: './new-group-dialog.component.html',
  styleUrls: ['./new-group-dialog.component.scss']
})
export class NewGroupDialogComponent {
  form: FormGroup;
  group: Group;
  avatarLink: string;
  private avatarBlob: Blob;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Group,
              private fb: FormBuilder,
              private groupService: GroupsService,
              private fileUploadService: FileUploadService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<NewGroupDialogComponent>,
              private sanitizer: DomSanitizer) {
    this.group = data;
    this.form = fb.group({
      avatar: ['http://oxupzzce5.bkt.clouddn.com/default_group.jpg'],
      name: ['', Validators.required]
    });
    this.avatarLink = this.form.value.avatar;
  }

  setAvatarBlog(blob: Blob) {
    this.avatarBlob = blob;
    this.avatarLink = URL.createObjectURL(blob);
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.avatarBlob) {
      this.fileUploadService.uploadFile(this.avatarBlob).concatMap(
        (resp: { hash: string, key: string }) => {
          this.form.patchValue({'avatar': resp.hash});
          return this.groupService.createGroup(this.form.value);
        }
      ).subscribe(
        () => this.dialogRef.close(),
        () => {
          this.notificationService.addNotification('create group failed', 'error');
        }
      );
    }
  }
}
