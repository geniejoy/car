import { AfterViewInit, Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import { CarService } from '../../car.service';
import { CustomerTableSchema } from '@models/car-server-table-schema.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-commons-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @Input() customer;
  @Output() customerChange = new EventEmitter();
  customers: CustomerTableSchema[] = [];
  formGroup: FormGroup;
  filteredOptions: Observable<CustomerTableSchema[]>;

  constructor(private fb: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      customer: new FormControl(this.customers)
    });
  }

  ngAfterViewInit() {
    this.formGroup.controls['customer'].valueChanges.subscribe(value => {
      this.filteredOptions = observableOf(value ? this.customers.filter(customer => customer.cs_name.indexOf(value) >= 0) : null);
      this.customer = value.cs_auto_no;
      this.customerChange.emit(this.customer);
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
    // clear emit data
    this.customerChange.emit(null);
    const leng = this.formGroup.controls['customer'].value.length;
    // if (leng && leng <= 2) {
    this.getCustomer(this.formGroup.controls['customer'].value);
    // }
  }

  displayWith(customer) {
    return customer ? customer.cs_name : '';
  }

  private _filter(value: string): CustomerTableSchema[] {
    const filterValue = value.toLowerCase();

    return this.customers.filter(customer => customer.cs_name.toLowerCase().indexOf(filterValue) === 0);
  }
}
