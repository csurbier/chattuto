import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPagePageRoutingModule } from './login-page-routing.module';

import { LoginPagePage } from './login-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPagePageRoutingModule
  ],
  declarations: [LoginPagePage]
})
export class LoginPagePageModule {}
