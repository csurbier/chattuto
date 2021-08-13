import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPagePage } from './chat-page.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPagePageRoutingModule {}
