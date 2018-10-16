import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

import { AuthGuardService } from '@auth/login-services/auth-guard.service';
import { AuthenticationService } from '@auth/login-services/authentication.service';
import { LoginComponent } from '@auth/login/login.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [LoginComponent],
  providers: [AuthGuardService, AuthenticationService]
})
export class AuthModule {}
