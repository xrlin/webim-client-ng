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
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from './token.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AvatarModule} from 'ngx-avatar';
import {ContactsService} from './contacts.service';
import {GroupsService} from './groups.service';
import {FriendsService} from './friends.service';
import {ClickOutsideModule} from 'ng-click-outside';
import {UserService} from './user.service';
import {FileUploadService} from './fileupload.service';
import {NotificationService} from './notification.service';
import {MenuService} from './menu.service';
import {MqttService} from './mqtt.service';
import {ThreadService} from './thread.service';
import {MessageService} from './message.service';

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
    MatListModule,
    MatMenuModule
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
    MatListModule,
    MatMenuModule
  ],
  providers: [
    TokenService,
    UserService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ContactsService,
    GroupsService,
    FriendsService,
    FileUploadService,
    NotificationService,
    MenuService,
    MqttService,
    MessageService,
    ThreadService
  ],
  declarations: []
})
export class CoreModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }
}
