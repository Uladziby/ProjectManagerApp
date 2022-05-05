import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrarionComponent } from './components/registrarion/registrarion.component';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    AuthComponent,
    RegistrarionComponent,
    LoginComponent,
    
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,AuthRoutingModule,
  ],
  exports: [
    AuthComponent,
    LoginComponent,

  ],
})
export class AuthModule { }
