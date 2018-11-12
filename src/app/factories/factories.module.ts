import { FactoriesComponent } from './factories.component';
import { FactoriesRoutingModule } from './factories-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConditionsComponent } from './conditions/conditions.component';
import { CommonsModule } from '@commons/commons.module';
import { HistoriesComponent } from './histories/histories.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [SharedModule, FactoriesRoutingModule, CommonsModule],
  exports: [CommonsModule],
  declarations: [FactoriesComponent, ConditionsComponent, HistoriesComponent, DetailComponent]
})
export class FactoriesModule {}
