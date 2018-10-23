import { CarNumberComponent } from './car-number/car-number.component';
import { CustomerComponent } from './customer/customer.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [CustomerComponent, CarNumberComponent, DatePickerComponent],
  exports: [CustomerComponent, CarNumberComponent, DatePickerComponent]
})
export class CommonsModule {}
