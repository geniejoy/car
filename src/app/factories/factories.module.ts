import { FactoriesComponent } from './factories.component';
import { FactoriesRoutingModule } from './factories-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConditionsComponent } from './conditions/conditions.component';
import { CommonsModule } from '@commons/commons.module';

@NgModule({
  imports: [SharedModule, FactoriesRoutingModule, CommonsModule],
  exports: [CommonsModule],
  declarations: [FactoriesComponent, ConditionsComponent]
})
export class FactoriesModule {}
