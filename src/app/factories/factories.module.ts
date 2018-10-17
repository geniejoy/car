import { CommonsModule } from '@commons/commons.module';
import { FactoriesComponent } from './factories.component';
import { FactoriesRoutingModule } from './factories-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OptionsComponent } from './options/options.component';

@NgModule({
  imports: [SharedModule, CommonsModule, FactoriesRoutingModule],
  declarations: [FactoriesComponent, OptionsComponent]
})
export class FactoriesModule {}
