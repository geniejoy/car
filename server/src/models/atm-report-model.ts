import { Granularity, CounterIndex, DateTimeRange } from './atm-base-model';

export interface AtmReportRequest {
  reportType: string;
  resourceGroupId: string;
  granularity: Granularity;
  counterIndex: CounterIndex;
  reportDateTime: DateTimeRange;
}

export interface ReportDataCategories {
  // list of lable e.g. [Sub-Network]
  datasetLabel: string[];
  // Sum From Sub-Network To Sub-Network
  dataValue: string[];
}
export interface ReportDataPoint {
  time: string;
  value: number[];
}

export interface ReportData {
  // e.g. [ 'SN101and201' ]
  label: string[];
  data: ReportDataPoint[];
}

// subnet traffic compare report
export interface AtmReport {
  report: string;
  datetimeStart: string;
  datetimeEnd: string;
  // string representation of resource e.g. All Sub-Network
  subNetworkGroup: string;
  // string representation of counter idx e.g. bps
  counter: string;
  // string; representation; of; DateTimeRange; PeriodRange;
  period: string;
  // string; representation; of; Granularity;
  granularity: string;
  categories: ReportDataCategories;
  dataset: ReportData[];
}

export interface ReportFilter {
  reportType?: string;
  resourceGroupId?: string;
  counterIndex?: CounterIndex;
}

export interface AtmReportAdded {
  report: string;
  datetimeAdded: string;
  resourceGroup: string;
  categories: ReportDataCategories;
  addedDataset: ReportData[];
}
