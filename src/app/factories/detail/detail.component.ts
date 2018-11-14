import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild
  } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { FactoryHistories, FixLinesTableSchema } from '@models/car-server-table-schema.model';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent
  } from '@angular/material';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'app-factories-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;
  @Input() detailInfo: FactoryHistories = { lines: [] };
  dataSource: MatTableDataSource<FixLinesTableSchema> | null;
  dataSubject = new BehaviorSubject(null);
  displayedColumns: string[];
  pageEvent: PageEvent;
  pageSizeOptions: number[];

  constructor() {
    this.displayedColumns = ['itemName', 'itemStd', 'qty', 'price', 'subTotal'];
    this.pageSizeOptions = [5, 10, 20];
    this.dataSource = new MatTableDataSource(this.detailInfo.lines);
  }

  ngOnInit() {
    this.sortingDataAccessor();
    this.dataSource.sort = this.tableSort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
  }

  ngAfterViewInit() {
    merge(this.tableSort.sortChange, this.paginator.page).subscribe(() => {
      // this.closeExpanded();
    });
    this.tableSort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      // this.applyFilter();
    });
  }

  ngOnChanges(changes) {
    console.log('detail changes:', changes['detailInfo']);
    this.dataSource.data = this.detailInfo.lines;
    console.log('this.dataSource.data:', this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.tableSort;
    // this.applyFilter();
  }

  sortingDataAccessor() {
    this.dataSource.sortingDataAccessor = (tableData, sortHeaderId: string) => {
      return '';
    };
  }
}
