import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CarService } from '../../car.service';
import { carTableSchema } from '@models/car-server-table-schema.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-common-car-number',
  templateUrl: './car-number.component.html',
  styleUrls: ['./car-number.component.scss']
})
export class CarNumberComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() customer;
  @Output() carNoChange = new EventEmitter();
  cars: carTableSchema[] = [];
  formGroup: FormGroup;
  filteredOptions: Observable<carTableSchema[]>;

  constructor(private fb: FormBuilder, private carService: CarService) {}

  ngOnInit() {
    this.formGroup = this.fb.group({ car: '' });
  }

  ngOnChanges(changes) {
    console.log('changes:', changes);
    if (changes['customer'] && this.customer) {
      this.getCar();
    }
  }

  ngAfterViewInit() {
    this.formGroup.controls['car'].valueChanges.subscribe(value => {
      this.filteredOptions = observableOf(
        value
          ? this.cars.filter(car => car.cr_no.indexOf(value) >= 0 && car.cr_cs_no === this.customer)
          : this.cars.slice()
      );

      this.carNoChange.emit(value);
    });
  }

  getCar() {
    this.cars = [];
    this.carService.carChange.subscribe((data: Array<carTableSchema>) => {
      console.log('car:', data);
      this.cars = data;
      // init data
      // this.filteredOptions = this.carService.carChange.pipe(
      //   startWith<string | carTableSchema>(''),
      //   map(value => (typeof value === 'string' ? value : value.cr_no)),
      //   map(name => (name ? this._filter(name) : this.cars.slice()))
      // );
    });
  }

  private _filter(value: string): carTableSchema[] {
    const filterValue = value.toLowerCase();

    return this.cars.filter(car => car.cr_no.toLowerCase().indexOf(filterValue) === 0);
  }
}
