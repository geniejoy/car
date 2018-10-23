import { NgModule } from '@angular/core';
import { CustomersComponent } from './customers.component';
import { SharedModule } from '@shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  imports: [SharedModule, CustomersRoutingModule],
  declarations: [CustomersComponent]
})
export class CustomersModule {}
