import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/layout/layout.module').then(m => m.LayoutModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import("./pages/forgot-password/forgot-password.module").then(m => m.ForgotPasswordModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import("./pages/reset-password/reset-password.module").then(m => m.ResetPasswordModule)
  },
  {
    path: '',
    loadChildren: () => import("./pages/signin/signin.module").then(m => m.SigninModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
