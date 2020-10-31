import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './modules/login/login.page';
import { SignUpPage } from './modules/sign-up/sign-up.page';
import { UpdatePasswordComponent } from './modules/update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'sign_up',
    component: SignUpPage
  },
  {
    path: 'update_password',
    component: UpdatePasswordComponent
  },
  {
    path: 'tabs',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
