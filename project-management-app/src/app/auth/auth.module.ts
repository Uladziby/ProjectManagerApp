import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarionComponent } from './components/registrarion/registrarion.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    AuthComponent,
    RegistrarionComponent,
    LoginComponent,
    EditProfileComponent,

  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule
  ],
  exports: [
    AuthComponent,
    LoginComponent,

  ],
})
export class AuthModule { }
