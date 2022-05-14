import { BoardModule } from './board/board.module';
import { RouteEnum } from 'src/app/shared/interfaces/enums';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { WelcomeComponent } from './core/pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
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
      import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: RouteEnum.board+'/:id',
    loadChildren: () =>
      import('./board-route/board-route.module').then((m) => m.BoardRouteModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
