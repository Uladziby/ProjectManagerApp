import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { WelcomeComponent } from './core/pages/welcome/welcome.component';
import { LoginGuard } from './core/guards/login-guard.guard';
import { BoardListComponent } from './main/board-list/board-list.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: RouteEnum.login,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteEnum.signup,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteEnum.editProfile,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: RouteEnum.boards,
    loadChildren: () =>
      import('./main/board.module').then((m) => m.BoardModule),
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    component: BoardListComponent,
    pathMatch: 'full',
  },
  {
    path: RouteEnum.board + '/:id',
    loadChildren: () =>
      import('./board-route/board-route.module').then(
        (m) => m.BoardRouteModule
      ),
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
