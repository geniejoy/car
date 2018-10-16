import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CarNumberComponent } from './car-number/car-number.component';
import { SharedModule } from '@shared/shared.module';
import { DatePickerComponent } from './date-picker/date-picker.component';
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CustomerComponent, CarNumberComponent, DatePickerComponent],
  exports: [CustomerComponent, CarNumberComponent, DatePickerComponent]
})
export class CommonsModule {}
