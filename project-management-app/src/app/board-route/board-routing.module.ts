import { BoardRouteComponent } from './board/board-route.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: BoardRouteComponent, data: {animation: 'Board'}}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class BoardRouteRoutingModule { }
