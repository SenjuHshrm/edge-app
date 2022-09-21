import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyPartnersComponent } from './key-partners.component';

const routes: Routes = [
  {
    path: '',
    component: KeyPartnersComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        title: 'EdgeCommerce | Login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'register',
        title: 'EdgeCommerce | Register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeyPartnersRoutingModule { }