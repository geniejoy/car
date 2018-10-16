import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { CustomerTableSchema, carTableSchema } from '@models/car-server-table-schema.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  customerChange: BehaviorSubject<any> = new BehaviorSubject<CustomerTableSchema[]>([]);
  carChange: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  itemChange: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    // this.getCars();
    // this.getItems();
    // this.getCustomers();
  }

  getCustomers(customerName?: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({
      headers: headers,
      params: {
        table: 'customer',
        customerName: customerName
      }
    });
    const body = new HttpParams().set('table', 'customer').set('customerName', customerName);
    this.http
      // .get(`/car/getJson.php?table=customer&customerName=${customerName}`)
      .post('/car/getJson.php', body)
      .subscribe((datas: Array<CustomerTableSchema>) => {
        // console.log('service customer:', datas);
        const customerInfos = [];

        datas.forEach((data, index) => {
          console.log('data:', data.cs_name.substr(0, 2));
          const customerData = data;
          customerData.letter = data.cs_no.substr(0, 1);
          customerInfos.push(customerData);
          customerInfos.sort((a, b) => a.cs_no.localeCompare(b.cs_no));
          if (index % 10 === 0) {
            this.customerChange.next(customerInfos);
          }
        });
        this.customerChange.next(customerInfos);
      });
  }

  getCars() {
    this.http.get('/car/getJson.php?table=car').subscribe((datas: Array<carTableSchema>) => {
      // console.log('service car:', datas);
      const carInfos = [];

      datas.forEach((data, index) => {
        carInfos.push(data);
        carInfos.sort((a, b) => a.cr_no.localeCompare(b.cr_no));
        if (index % 10 === 0) {
          this.carChange.next(carInfos);
        }
      });
      this.carChange.next(carInfos);
    });
  }

  async getItems() {
    await this.http.get('/car/getJson.php?table=item').subscribe(data => {
      this.itemChange.next(data);
    });
  }
}
