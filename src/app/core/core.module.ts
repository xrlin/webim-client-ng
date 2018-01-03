import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from './token.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AvatarModule} from 'ngx-avatar';
import {ContactsService} from './contacts.service';
import {RoomsService} from './rooms.service';
import {FriendsService} from './friends.service';
import {ClickOutsideModule} from 'ng-click-outside';
import {UserService} from './user.service';
import {FileUploadService} from './fileupload.service';
import {NotificationService} from './notification.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AvatarModule,
    MatDialogModule,
    ClickOutsideModule,
    FormsModule,
  ],
  exports: [
    MatCheckboxModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
    PerfectScrollbarModule,
    AvatarModule,
    MatDialogModule,
    ClickOutsideModule,
    FormsModule,
  ],
  providers: [
    TokenService,
    UserService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ContactsService,
    RoomsService,
    FriendsService,
    FileUploadService,
    NotificationService
  ],
  declarations: []
})
export class CoreModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }
}
