import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './core/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ChatWindowComponent} from './chat-window/chat-window.component';
import {UserAvatarComponent} from './shared/user-avatar/user-avatar.component';
import {AvatarDetailDialogComponent} from './avatar-detail-dialog/avatar-detail-dialog.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {ApiConfig} from './config/api.config';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', canActivate: [AuthGuard], pathMatch: 'full', component: ChatWindowComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatWindowComponent,
    UserAvatarComponent,
    AvatarDetailDialogComponent
  ],
  imports: [
    BrowserModule, CoreModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  entryComponents: [AvatarDetailDialogComponent],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {provide: 'endpoint', useValue: 'http://localhost:8080/api'},
    ApiConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
