import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CarService } from '../../car.service';
import { CarTableSchema } from '@models/car-server-table-schema.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable, observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-common-car-number',
  templateUrl: './car-number.component.html',
  styleUrls: ['./car-number.component.scss']
})
export class CarNumberComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() customer;
  @Input() carNo;
  @Output() customerChange = new EventEmitter();
  @Output() carNoChange = new EventEmitter();
  cars: CarTableSchema[] = [];
  formGroup: FormGroup;
  filteredOptions: Observable<CarTableSchema[]>;

  constructor(private fb: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({ car: new FormControl(this.carNo) });
  }

  ngOnChanges(changes) {
    console.log('car changes:', changes);
    if (changes['customer'] && this.customer) {
      this.getCar(this.carNo);
    }
  }

  ngAfterViewInit() {
    this.formGroup.controls['car'].valueChanges.subscribe(value => {
      this.filteredOptions = observableOf(
        value
          ? this.cars.filter(car => car.cr_no.indexOf(value) >= 0 && car.cr_cs_no === this.customer)
          : this.cars.slice()
      );
      this.carNo = value.cr_auto_no;
      this.carNoChange.emit(this.carNo);
    });
  }

  getCar(carNo) {
    this.cars = [];
    this.carService.getCars({ customerNo: this.customer, carNo: carNo ? carNo : '' });
    this.carService.carChange.subscribe((data: Array<CarTableSchema>) => {
      console.log('car:', data);
      this.cars = data;
      // init data
      this.filteredOptions = this.carService.customerChange.pipe(
        startWith<string | CarTableSchema>(''),
        map(value => (typeof value === 'string' ? value : value.cr_no)),
        map(name => (name ? this._filter(name) : this.cars.slice()))
      );
    });
  }

  input() {
    // clear emit data
    this.carNoChange.emit(null);
    this.getCar(this.formGroup.controls['car'].value);
  }

  displayWith(car) {
    return car ? car.cr_no : '';
  }

  private _filter(value: string): CarTableSchema[] {
    const filterValue = value.toLowerCase();

    return this.cars.filter(car => car.cr_no.toLowerCase().indexOf(filterValue) === 0);
  }
}
