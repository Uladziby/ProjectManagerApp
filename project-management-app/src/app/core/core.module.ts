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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { ApproveModalComponent } from './modal/approve-modal/approve-modal.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { CreationModalComponent } from './modal/creation-modal/creation-modal.component';
import { TOKEN_INTERCEPTOR } from '../shared/services/token.interceptor';
import { WelcomeComponent } from './pages/welcome/welcome.component';

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
    NotFoundComponent,
    ModalComponent,
    ApproveModalComponent,
    CreationModalComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ...materialModules,
    FormsModule,
    OverlayModule,
    MatDialogModule,
  ],
  providers: [TOKEN_INTERCEPTOR],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ...materialModules,
    ModalComponent,
    ApproveModalComponent,
    OverlayModule,
  ],
})
export class CoreModule {}
