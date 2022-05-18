import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BoardRouteComponent } from './board/board-route.component';
import { BoardRouteRoutingModule } from './board-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { SortPipe } from './pipes/sort.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule,
  MatExpansionModule,
  MatGridListModule,
  MatMenuModule,
];

@NgModule({
  declarations: [BoardRouteComponent, SortPipe],
  imports: [
    CommonModule,
    BoardRouteRoutingModule,
    ...materialModules,
    DragDropModule,
    ScrollingModule,
  ],
  exports: [BoardRouteComponent],
})
export class BoardRouteModule {}
