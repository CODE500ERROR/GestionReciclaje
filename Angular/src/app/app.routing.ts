import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const AppRoutes: Routes = [

  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      }
    ]
  },


  { path: 'login', component: LoginComponent }
];
