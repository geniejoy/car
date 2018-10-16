import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GnaValidatorsModule } from 'gna-validators';
import { LabModule } from './lab/lab.module';
import { LabNavComponent } from './lab-nav/lab-nav.component';
import { LabRoutingModule } from './lab/lab-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AppComponent, LabNavComponent],
  imports: [
    BrowserModule,
    SharedModule,
    LabRoutingModule,
    LayoutModule,
    LabModule,
    BrowserAnimationsModule,
    GnaValidatorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
