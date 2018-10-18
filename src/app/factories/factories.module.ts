import { CommonsModule } from '@commons/commons.module';
import { FactoriesComponent } from './factories.component';
import { FactoriesRoutingModule } from './factories-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConditionsComponent } from './conditions/conditions.component';

@NgModule({
  imports: [SharedModule, CommonsModule, FactoriesRoutingModule],
  declarations: [FactoriesComponent, ConditionsComponent]
})
export class FactoriesModule {}
