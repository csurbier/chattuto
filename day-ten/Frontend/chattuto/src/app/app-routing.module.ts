import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AutoGuard } from './guards/auto.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('./pages/register-page/register-page.module').then( m => m.RegisterPagePageModule)
  },
  {
    path: 'login',
    canLoad: [AutoLoginGuard],
    loadChildren: () => import('./pages/login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'home',
    canLoad:[AutoGuard],
    loadChildren: () => import('./pages/home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'chat-page',
    canLoad:[AutoGuard],
    loadChildren: () => import('./pages/chat-page/chat-page.module').then( m => m.ChatPagePageModule)
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
