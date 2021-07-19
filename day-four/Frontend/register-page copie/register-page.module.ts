import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPagePageRoutingModule } from './register-page-routing.module';

import { RegisterPagePage } from './register-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPagePageRoutingModule
  ],
  declarations: [RegisterPagePage]
})
export class RegisterPagePageModule {}
