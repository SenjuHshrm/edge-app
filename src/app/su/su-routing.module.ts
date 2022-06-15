import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuComponent } from './su.component';

const routes: Routes = [
  {
    path: '',
    component: SuComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login', 
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuRoutingModule { }
