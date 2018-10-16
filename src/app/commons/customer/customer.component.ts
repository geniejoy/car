import { Component, OnInit, Output, AfterViewInit, EventEmitter } from '@angular/core';
import { CarService } from '../../car.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerTableSchema } from '@models/car-server-table-schema.model';
import { map, startWith } from 'rxjs/operators';
import { Observable, of as observableOf, observable } from 'rxjs';

@Component({
  selector: 'app-commons-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @Output() customerChange = new EventEmitter();
  customers: CustomerTableSchema[] = [];
  formGroup: FormGroup;
  filteredOptions: Observable<CustomerTableSchema[]>;

  constructor(private fb: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({ customer: this.customers });
    // this.getCustomer();
  }

  ngAfterViewInit() {
    this.formGroup.controls['customer'].valueChanges.subscribe(value => {
      this.filteredOptions = observableOf(
        value ? this.customers.filter(customer => customer.cs_name.indexOf(value) >= 0) : null
      );

      this.customerChange.emit(value);
      console.log('emit customer ', value.cs_auto_no);
    });
  }

  getCustomer(customerName) {
    this.customers = [];
    this.carService.getCustomers(customerName);
    this.carService.customerChange.subscribe((data: Array<CustomerTableSchema>) => {
      // console.log('customer:', data);
      this.customers = data;
      // init data
      this.filteredOptions = this.carService.customerChange.pipe(
        startWith<string | CustomerTableSchema>(''),
        map(value => (typeof value === 'string' ? value : value.cs_name)),
        map(name => (name ? this._filter(name) : this.customers.slice()))
      );
    });
  }

  input() {
    const leng = this.formGroup.controls['customer'].value.length;
    if (leng && leng <= 2) {
      this.getCustomer(this.formGroup.controls['customer'].value);
    }
  }

  private _filter(value: string): CustomerTableSchema[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter(customer => customer.cs_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
