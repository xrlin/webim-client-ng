import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './core/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', canActivate: [AuthGuard], pathMatch: 'full', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, CoreModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
