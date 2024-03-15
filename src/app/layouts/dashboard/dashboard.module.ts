import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';
import { PipesModule } from './pages/pipes/pipes.module';
import { SharedModule } from '../../shared/shared.module';
import { RxjsExampleModule } from './pages/rxjs-example/rxjs-example.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import {MatListModule} from '@angular/material/list';
import { UserDetailComponent } from './pages/users/pages/user-detail/user-detail.component';
import { adminGuard } from '../../core/guards/admin.guard';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    UsersModule,
    PipesModule,
    SharedModule,
    RxjsExampleModule,
    MatListModule,
    RouterModule.forChild([
      {
        path:'home',
        component:HomeComponent
        },
        {
        path: 'users',
        canActivate:[adminGuard],
        loadChildren:()=>import('./pages/users/users.module').then(
          (m)=>m.UsersModule
        )
            
          },
          {
            path: 'users/:id',
            component:UserDetailComponent,
                
              },

        
      {
        path: 'cursos',
        loadChildren:()=>import('./pages/cursos/cursos.module').then(
          (m)=>m.CursosModule
        )
      },
      {
        path:'**',
        redirectTo:'home'
      },
    ])

  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
