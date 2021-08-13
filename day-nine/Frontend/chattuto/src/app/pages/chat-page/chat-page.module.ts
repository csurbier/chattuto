import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPagePageRoutingModule } from './chat-page-routing.module';

import { ChatPagePage } from './chat-page.page';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxIonicImageViewerModule,
    ChatPagePageRoutingModule
  ],
  declarations: [ChatPagePage]
})
export class ChatPagePageModule {}
