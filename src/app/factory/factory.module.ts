import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CommonsModule } from '@commons/commons.module';
import { FactoryComponent } from './factory.component';
import { OptionsComponent } from './options/options.component';
import { FactoryRoutingModule } from './factory-routing.module';

@NgModule({
  imports: [SharedModule, CommonsModule, FactoryRoutingModule],
  declarations: [FactoryComponent, OptionsComponent]
})
export class FactoryModule {}
