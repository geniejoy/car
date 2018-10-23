import { FormControl } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input() value: string; // format is YYYY-MM-DD;
  @Input() disabled: boolean;
  @Input() label: string;
  @Output() dateChange: EventEmitter<string>;
  @ViewChild('picker') picker: MatDatepicker<any>;
  date: FormControl;

  constructor(@Inject(DOCUMENT) private dom: any) {
    this.initialize();
  }

  ngOnInit() {
    this.initDate();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value'] && changes['value'].previousValue) {
      this.initDate();
    }
  }

  onDateChange() {
    const emitData = this.formatDate(this.date.value);
    this.dateChange.emit(emitData);
  }

  onDatePickOpened() {
    setTimeout(() => {
      this.addTodayBtnAndEvent('Today');
    }, 500);
  }

  private addTodayBtnAndEvent(name: string) {
    // get calendar style
    const today = this.dom.querySelector('.mat-calendar-spacer');
    if (today) {
      today.classList.add('gna-today-btn');
      today.setAttribute('name', name);
      today.addEventListener('click', this.clickToday.bind(this));
    }
  }

  private clickToday() {
    this.picker.close();
    this.date.setValue(new Date());
    const emitData = this.formatDate(this.date.value);
    this.dateChange.emit(emitData);
  }

  private formatDate(date: Date) {
    const regExp = new RegExp('/', 'g');
    return date.toLocaleDateString('zh').replace(regExp, '-');
  }

  private initialize() {
    this.dateChange = new EventEmitter();
  }

  private initDate() {
    const value = this.value ? new Date(this.value.replace(/-/g, '/')) : new Date();
    this.date = new FormControl({
      value: value,
      disabled: true
    });
  }
}
