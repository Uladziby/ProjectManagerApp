import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { ApproveModalComponent } from './modal/approve-modal/approve-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { CreationModalComponent } from './modal/creation-modal/creation-modal.component';

const materialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatIconModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    ApproveModalComponent,
    CreationModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ...materialModules,
    FormsModule,
    OverlayModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ...materialModules,
    ModalComponent,
    ApproveModalComponent,
    OverlayModule,
  ],
})
export class CoreModule {}
