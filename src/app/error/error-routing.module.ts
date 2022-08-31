import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';

const routes: Routes = [{ path: '', component: ErrorComponent }, { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }, { path: '403', loadChildren: () => import('./forbidden/forbidden.module').then(m => m.ForbiddenModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
