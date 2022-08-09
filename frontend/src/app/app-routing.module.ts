import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { DashboardRoutes } from './dashboard/dashboard.routing';
import { FullComponent } from './full/full.component';
import { MainComponent } from './home/main.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  // //{ path: '', component: MainComponent },
  // {
  //   path:'halal/dashboard',
  //   component: DashboardComponent,
  //   // children: [
  //   //   { path: '', component: AboutHomeComponent },
  //   //   { path: 'item/:id', component: AboutItemComponent }
  //   // ]
  // }
  { path: '', component: MainComponent },
  {
    path: 'halal',
    component: FullComponent,
    //component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/halal/dashboard',
        pathMatch: 'full',
      },
      {
         path: '',
         loadChildren:
           () => import('./material-component/material/material.module').then((m) => m.MaterialComponentsModule),
           canActivate: [GuardService],
           data: {
            expectedRole : ['admin', 'user']
          }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [GuardService],
        data: {
          expectedRole : ['admin', 'user']
        }
      },
     
    ]
  },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // initialNavigation: 'enabled',
      scrollPositionRestoration: 'top'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
