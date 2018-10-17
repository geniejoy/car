import { AppComponent } from './app.component';
import { AuthGuardService } from '@auth/login-services/auth-guard.service';
import { AuthModule } from '@auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonsModule } from '@commons/commons.module';
import { CoreModule } from '@core/core.module';
import { CustomersModule } from '@customers/customers.module';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FactoriesModule } from '@factories/factories.module';
import { ItemsModule } from '@items/items.module';
import { LoginComponent } from '@auth/login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuardService],
    loadChildren: './console/console.module#ConsoleModule'
  },
  { path: '**', redirectTo: 'login' }
];
const routeOptions: ExtraOptions = {
  enableTracing: true
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonsModule,
    CustomersModule,
    ItemsModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    FactoriesModule,
    RouterModule.forRoot(routes, routeOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
