import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { HomeModule } from '../home/home.module';
import { AccountModuleRoutingModule } from './account-routing-module.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    HomeModule,
    AccountModuleRoutingModule
  ]
})
export class AccountModule { }
