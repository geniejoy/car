import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '@shared/shared.module';
import { CommonsModule } from '@commons/commons.module';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [SharedModule, CommonsModule, CustomersRoutingModule],
  declarations: [CustomersComponent]
})
export class CustomersModule {}
