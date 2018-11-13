import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild
  } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
  } from '@angular/animations';
import { CarService } from '../../car.service';
import {
  CarTableSchema,
  CustomerTableSchema,
  FactoryHistories,
  FixHeadersTableSchema,
  FixLinesTableSchema
  } from '@models/car-server-table-schema.model';
import { FixHeadersInput } from '@models/condication-input.model';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent
  } from '@angular/material';
import { merge, Subject } from 'rxjs';
@Component({
  selector: 'app-factories-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
  animations: [
    trigger('rowExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class HistoriesComponent implements OnInit, OnChanges, AfterViewInit, DoCheck {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) tableSort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @Input() customer;
  @Input() carNo;
  @Input() sDate = '';
  @Input() eDate = '';
  displayedColumns: string[];
  expandSubject: Subject<null>;
  pageEvent: PageEvent;
  dataSource: MatTableDataSource<FactoryHistories> | null;
  filterValue = '';
  filterDisabled: boolean;
  pageSizeOptions: number[];
  expandedViewId: number;
  expandedAddId: number;
  expandedEditId: number;
  expandedDelId: number;
  expandedRowId: number;

  constructor(private carService: CarService) {
    this.displayedColumns = ['actions', 'status', 'fixNo', 'fixDate', 'customerName', 'carNo', 'total', 'bookNo'];
    this.pageSizeOptions = [5, 10, 20];
    this.expandSubject = new Subject();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.carService.factoryHistory);
    this.sortingDataAccessor();
    this.dataSource.sort = this.tableSort;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
    this.subscribeExpandSubject();
  }

  ngOnChanges(changes) {
    console.log('HistoriesComponent changes:', changes);
    // this.closeExpanded();
    const oldExpandedViewId = this.expandedViewId;
    this.getFactoryHistoriesData();
    this.toggleViewRow(oldExpandedViewId);
  }

  ngAfterViewInit() {
    merge(this.tableSort.sortChange, this.paginator.page).subscribe(() => {
      this.closeExpanded();
    });
    this.tableSort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.applyFilter();
    });
  }

  ngDoCheck() {
    // console.log('history dataSource:', this.dataSource);
  }

  getFactoryHistoriesData() {
    this.filterDisabled = true;
    setTimeout(() => {
      // console.log('HistoriesComponent into getFactoryHistoriesData');
      // console.log('customer:', this.customer);
      // console.log('car:', this.carNo);
      // console.log('sDate:', this.sDate);
      // console.log('eDate:', this.eDate);
      // if (!this.customer || !this.carNo || !this.sDate || !this.eDate) {
      if (!this.sDate || !this.eDate) {
        // console.log('....return!');
        return;
      }
      const params: FixHeadersInput = {
        customerNo: this.customer ? String(this.customer) : '',
        carNo: this.carNo ? String(this.carNo) : '',
        sDate: this.sDate,
        eDate: this.eDate
      };
      this.carService.getFactoryHistoriesData(params);
      this.carService.factoryHistoryChange.subscribe(data => {
        // console.log('hisotry:', data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.tableSort;
        if (data) {
          this.filterDisabled = false;
        }
        this.applyFilter();
      });
    });
  }

  subscribeExpandSubject() {
    this.expandSubject.subscribe(() => {
      this.closeExpanded();
    });
  }

  applyFilter() {
    this.closeExpanded();
    // this.dataSource.filterPredicate = (result, filter) =>
    //   String(result.header_id).indexOf(filter) !== -1 ||
    //   result.c.toLowerCase().indexOf(filter) !== -1 ||
    //   result.header.userName.toLowerCase().indexOf(filter) !== -1;

    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  closeExpanded() {
    this.expandedRowId = null;
    this.resetexpandedIndex();
  }
  resetexpandedIndex() {
    this.expandedViewId = null;
    this.expandedAddId = null;
    this.expandedEditId = null;
    this.expandedDelId = null;
  }

  toggleViewRow(row) {
    this.resetexpandedIndex();
    this.expandedRowId = row.header.header_id;
    this.expandedViewId = row.header.header_id;
  }

  toggleDeleteRow(row) {
    this.resetexpandedIndex();
    this.expandedRowId = row.header.header_id;
    this.expandedDelId = row.header.header_id;
  }

  toggleAddRow() {
    this.resetexpandedIndex();
    this.expandedRowId = -1;
    this.expandedAddId = -1;
  }

  toggleEditRow(row) {
    this.resetexpandedIndex();
    this.expandedRowId = row.header.header_id;
    this.expandedEditId = row.header.header_id;
  }

  sortingDataAccessor() {
    this.dataSource.sortingDataAccessor = (tableData, sortHeaderId: string) => {
      switch (sortHeaderId) {
        case 'status':
        return tableData.header.status;
        case 'fixNo':
        return tableData.header.orig_fix_no;
        case 'customerNmae':
        return tableData.customerInfo.cs_name;
        case 'carNo':
        return tableData.header.car_no;
        case 'total':
        return tableData.header.paper_total;
        case 'bookNo':
          return tableData.header.paper_seq;
        case 'fixDate':
        default:
          return tableData.header.fix_date;
      }
    };
  }

  getRow(row) {
    alert(row);
  }
}
