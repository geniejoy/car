import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import {
  CustomerTableSchema,
  CarTableSchema,
  FixHeadersTableSchema,
  FixLinesTableSchema,
  FactoryHistories
} from '@models/car-server-table-schema.model';
import { FixHeadersInput } from '@models/condication-input.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  factoryHistory: FactoryHistories[];
  customerChange: BehaviorSubject<any> = new BehaviorSubject<CustomerTableSchema[]>([]);
  carChange: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  itemChange: BehaviorSubject<any> = new BehaviorSubject<any[]>([]);
  factoryHistoryChange: BehaviorSubject<any> = new BehaviorSubject<FactoryHistories[]>([]);
  fixLinesChange: BehaviorSubject<any> = new BehaviorSubject<FixLinesTableSchema[]>([]);
  statusMapping = status => {
    let str = '';
    switch (status) {
      case '00002':
        // str = 'done';
        str = 'V';
        break;
      case '99999':
        // str = 'close';
        str = 'X';
        break;
      default:
        // str = 'border_color';
    }
    return str;
  }

  constructor(private http: HttpClient) {
    // this.getCars();
    // this.getItems();
    // this.getCustomers();
  }

  getCustomers(parmas) {
    const body = new HttpParams()
      .set('table', 'customer')
      // .set('debug', '1')
      .set('customerNo', parmas.customerNo ? parmas.customerNo : '')
      .set('customerName', parmas.customerName ? parmas.customerName : '');
    this.http
      // .get(`/Car/getJson.php?table=customer&customerName=${customerName}`)
      .post('/Car/getJson.php', body)
      .subscribe((dataList: Array<CustomerTableSchema>) => {
        const customerInfos = [];

        dataList.forEach((data, index) => {
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

  getCars(params) {
    const body = new HttpParams()
      .set('table', 'car')
      .set('customerNo', params.customerNo)
      .set('carNo', params.carNo);
    this.http.post('/Car/getJson.php', body).subscribe((dataList: Array<CarTableSchema>) => {
      // console.log('service car:', dataList);
      const carInfos = [];

      dataList.forEach((data, index) => {
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
    await this.http.get('/Car/getJson.php?table=item').subscribe(data => {
      this.itemChange.next(data);
    });
  }

  getFactoryHistoriesData(params: FixHeadersInput) {
    const body = new HttpParams()
      // .set('debug', '1')
      .set('table', 'factorHistoryHeaders')
      .set('customerNo', params.customerNo)
      .set('carNo', params.carNo)
      .set('sDate', params.sDate)
      .set('eDate', params.eDate);
    this.http.post('/Car/getJson.php', body).subscribe(dataList => {
      if (!dataList || dataList['headers'].length === 0) {
        return;
      }
      const infos = [];
      const headers = dataList['headers'].sort((a, b) => {
        if (a.fix_date < b.fix_date) {
          return 1;
        } else {
          return -1;
        }
      });
      headers.forEach((data, index) => {
        const customerInfo = dataList['customerInfo'].find(customer => customer.cs_auto_no === data.cs_auto_no);

        const carInfo = dataList['carInfo'].find(car => car.cr_auto_no === data.cr_auto_no);

        infos.push({ header: data, customerInfo: customerInfo, carInfo: carInfo });

        if (index % 10 === 0) {
          this.factoryHistoryChange.next(infos);
        }
      });
      this.factoryHistoryChange.next(infos);
      this.getFactoryHistoriesLinesData(params);
      this.factoryHistory = infos;
    });
  }

  getFactoryHistoriesLinesData(params) {
    const body = new HttpParams()
      // .set('debug', '1')
      .set('table', 'factorHistoryLines')
      .set('customerNo', params.customerNo)
      .set('carNo', params.carNo)
      .set('sDate', params.sDate)
      .set('eDate', params.eDate);
    this.http.post('/Car/getJson.php', body).subscribe((dataList: Array<FixLinesTableSchema>) => {
      this.fixLinesChange.next(dataList);
    });

    this.fixLinesChange.subscribe(dataList => {
      if (!this.factoryHistory || !dataList || dataList['lines'].length === 0) {
        return;
      }
      const infos = [];
      const lines = dataList['lines'].sort((a, b) => {
        if (a.line_id > b.line_id) {
          return 1;
        }
        return -1;
      });
      const total = [];
      lines.forEach((data: FixLinesTableSchema) => {
        const info = this.factoryHistory.find(history => history.header && history.header.header_id === data.header_id);
        if (info) {
          if (!info.lines) {
            info.lines = [];
          }
          total[data.header_id] = total[data.header_id] ? total[data.header_id] : 0;
          console.log('header:', data.header_id, ',total:', total[data.header_id]);
          total[data.header_id] += Number(data.subtotal);
          info.lines.push(data);
          info.header.paper_total = total[data.header_id];
          info.header = { ...info.header, paper_total: total[data.header_id] };
          console.log(
            'headerId:',
            info.header.header_id,
            ', line header:',
            data.header_id,
            ',data.subtotal:',
            data.subtotal + ', total[data.header_id]:',
            total[data.header_id] + ', paper_total:',
            info.header.paper_total
          );
        }
      });
      this.factoryHistoryChange.next(this.factoryHistory);
      console.log('datas:', this.factoryHistory);
    });
  }
}
