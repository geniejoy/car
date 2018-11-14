import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from '@auth/auth.module';
import { CommonsModule } from '@commons/commons.module';
import { CoreModule } from '@core/core.module';
import { CustomersModule } from '@customers/customers.module';
import { FactoriesModule } from '@factories/factories.module';
import { ItemsModule } from '@items/items.module';
import { LogoutIconComponent } from './logout-icon/logout-icon.component';

@NgModule({
  declarations: [AppComponent, LogoutIconComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CustomersModule,
    ItemsModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    SharedModule,
    FactoriesModule,
    SharedModule,
    CommonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
