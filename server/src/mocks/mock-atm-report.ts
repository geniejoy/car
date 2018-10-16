import * as events from 'events';
import * as stream from 'stream';
import { AtmReportRequest, AtmReport, ReportData, AtmReportAdded, ReportDataPoint } from '../models/atm-report-model';
import {
  SubNetworkConfig,
  SubNetworkGroupConfig,
  SubNetworkTopnConfig,
  TopnKey,
  GenericConfigResult
} from '../models/atm-config-model';
import { MockConfigs } from './mock-config';
import { setTimeout } from 'timers';
import * as path from 'path';

// mock generator configs
interface MockSubnetCompareGenConfig {
  batchRows: Array<string>;
  colWidth?: number;
}

export class MockAtmReport extends events.EventEmitter {
  requestArgs: AtmReportRequest;
  mockConfigs: MockConfigs;
  fullRowData: Array<string>;
  minutesInterval: number;
  reportEndTime: Date;
  reportStartTime: Date;
  constructor() {
    super();
  }
  onInit() {
    // the default value is 12 mins
    this.minutesInterval = Number(process.env.REPORT_INTERVAL || 120);
    this.reportEndTime = new Date();
    this.reportStartTime = new Date();
    this.reportStartTime.setMinutes(this.reportStartTime.getMinutes() - this.minutesInterval);
    // init with subnetwork compare batch and update
    this.fullRowData = ['SN101and201', 'SN101', 'SN201', 'SN102', 'total'];
  }
  start(args: AtmReportRequest) {
    this.requestArgs = args;
    // todo : random subnet
    // this.mockConfigs = MockConfigs.getInstance();
    // todo random generate this dataset
    // this.fullRowData = this.mockConfigs.subnetList.map( (subnetInfo) => subnetInfo.id );
    // start sendingout mock data
    setImmediate(() => this.realStart());
  }
  realStart() {
    const nextCount = 5;
    const nextRows = this.fullRowData.slice(0, nextCount);
    const responseData = this.genSubnetworkCompareBatch({ batchRows: nextRows, colWidth: nextCount });
    const atmReport: AtmReport = {
      report: '\ufeffCompare Report',
      datetimeStart:
        this.reportStartTime.toLocaleDateString() + ' ' + this.reportStartTime.toTimeString().slice(0, 5) + ':00',
      datetimeEnd:
        this.reportEndTime.toLocaleDateString() + ' ' + this.reportEndTime.toTimeString().slice(0, 5) + ':00',
      subNetworkGroup: 'All Sub-Network',
      counter: 'bps',
      period: 'Daily',
      granularity: '5 min',
      categories: {
        datasetLabel: ['Sub-Network'],
        dataValue: ['Sum', 'From Sub-Network', 'To Sub-Network']
      },
      dataset: responseData
    };

    this.emit('message', atmReport);

    // todo pregressive python script or redis sub/pub
    // this.genedRowCount = nextCount;
    // if (this.genedRowCount < this.fullRowData.length) {
    //     setTimeout(() => this.realStart(), DEFAULT_BATCH_GAP_TIME);
    // }
  }

  genSubnetworkCompareBatch(config: MockSubnetCompareGenConfig): ReportData[] {
    return this.generateFlowSet(this.reportEndTime, this.minutesInterval);
  }

  genSubnetworkCompareUpdate(reportFilter: any, count: number): AtmReportAdded {
    const reportEndTime = new Date();
    const addedDataSet: ReportData[] = this.generateFlowSet(reportEndTime, 5);

    const atmReportAdded: AtmReportAdded = {
      report: '\ufeffCompare Report Update',
      datetimeAdded: reportEndTime.toLocaleDateString() + ' ' + reportEndTime.toTimeString().slice(0, 5) + ':00',
      resourceGroup: 'All Sub-Network',
      categories: {
        datasetLabel: ['Sub-Network'],
        dataValue: ['Sum', 'From Sub-Network', 'To Sub-Network']
      },
      addedDataset: addedDataSet
    };

    return atmReportAdded;
  }

  generateFlowSet(recEndTime: Date, minutesInterval: number): ReportData[] {
    const dateset: ReportData[] = Array();
    const totalFlowIn: Map<string, number> = new Map<string, number>();
    const totalFlowOut: Map<string, number> = new Map<string, number>();
    const totalFlowSum: Map<string, number> = new Map<string, number>();
    let flowIn: number;
    let flowOut: number;
    let flowSum: number;
    let timeS: string;
    let recTime: Date;
    let points: ReportDataPoint[];
    for (let _i = 0; _i < this.fullRowData.length; _i++) {
      points = Array();
      recTime = new Date(recEndTime.getTime());
      for (let _j = 0; _j < minutesInterval; _j = _j + 5) {
        timeS = recTime.toLocaleDateString() + ' ' + recTime.toTimeString().slice(0, 5) + ':00';
        if (this.fullRowData[_i].toLowerCase() != 'total') {
          flowIn = this.generateRandomFlow();
          flowOut = this.generateRandomFlow();
          flowSum = flowIn + flowOut;
          points.unshift({
            time: timeS,
            value: [flowSum, flowIn, flowOut]
          });
          if (!totalFlowIn.has(timeS)) {
            totalFlowIn.set(timeS, flowIn);
            totalFlowOut.set(timeS, flowOut);
            totalFlowSum.set(timeS, flowSum);
          } else {
            totalFlowIn.set(timeS, totalFlowIn.get(timeS) + flowIn);
            totalFlowOut.set(timeS, totalFlowOut.get(timeS) + flowOut);
            totalFlowSum.set(timeS, totalFlowSum.get(timeS) + flowSum);
          }
        } else {
          points.unshift({
            time: timeS,
            value: [totalFlowSum.get(timeS), totalFlowIn.get(timeS), totalFlowOut.get(timeS)]
          });
        }
        recTime.setMinutes(recTime.getMinutes() - 5);
      }
      dateset.push({
        label: [this.fullRowData[_i]],
        data: points
      });
    }
    return dateset;
  }

  generateRandomFlow(): number {
    const flow_base: number = Number(process.env.FLOW_BASE || 10000);
    const flow_mag_base: number = Number(process.env.FLOW_MAG_BASE || 10000);
    const flow_mag_range: number = Number(process.env.FLOW_MAG_RANGE || 10);
    return Math.floor(Math.random() * flow_mag_range) * flow_mag_base + flow_base;
  }
}
