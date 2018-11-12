import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import {
  FactoryHistories, FixLinesTableSchema
} from '@models/car-server-table-schema.model';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-factories-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;
  @Input() detailInfo: FactoryHistories;
  dataSource: MatTableDataSource<FixLinesTableSchema> | null;
  dataSubject = new BehaviorSubject(null);
  displayedColumns: string[];
  pageSizeOptions: number[];

  constructor() {
    this.displayedColumns = ['itemName', 'itemStd', 'qty', 'price', 'subTotal'];
    this.pageSizeOptions = [5, 10, 20];
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.detailInfo.lines);
  }

  ngOnChanges(changes) {
    console.log('detail changes:', changes);
    // this.dataSource.data = this.detailInfo.lines;
  }
}
