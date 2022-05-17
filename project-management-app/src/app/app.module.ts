import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { TOKEN_INTERCEPTOR } from './shared/services/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [TOKEN_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule { }
