import * as events from 'events';
import * as stream from 'stream';
import {
  RealtimeReportArgs,
  RealtimeReportParams,
  RTReportResult,
  RTReportDataBlock,
  RTReportResponse,
  RTRealTimeReport
} from '../models/realtime-report-model';
import {
  SubNetworkConfig,
  SubNetworkGroupConfig,
  SubNetworkTopnConfig,
  TopnKey,
  GenericConfigResult
} from '../models/atm-config-model';
import { MockConfigs } from './mock-config';
import { setTimeout } from 'timers';

const DEFAULT_COLUMN_WIDTH = 50;
const DEFAULT_BATCH_ROW_COUNT = 20;
const DEFAULT_BATCH_GAP_TIME = 1500;
interface MockDataGenConfig {
  batchRows: Array<string>;
  colWidth?: number;
  sparcityRatio?: number;
}
export class MockRealTimeReport extends events.EventEmitter {
  reportArgs: RealtimeReportArgs;
  mockConfigs: MockConfigs;
  fullRowData: Array<string>;
  genedRowCount = 0;
  constructor(private scriptArgs: any) {
    super();
    this.reportArgs = scriptArgs[4];
  }
  start() {
    this.mockConfigs = MockConfigs.getInstance();
    this.fullRowData = this.mockConfigs.subnetList.map(subnetInfo => subnetInfo.id);
    // start sendingout mock data
    setImmediate(() => this.realStart());
  }
  realStart() {
    const nextCount = Math.min(this.genedRowCount + DEFAULT_BATCH_ROW_COUNT, this.fullRowData.length);
    const nextRows = this.fullRowData.slice(this.genedRowCount, nextCount);
    const randomColCount = DEFAULT_COLUMN_WIDTH + Math.random() * DEFAULT_COLUMN_WIDTH;
    const responseData = this.genBreakdownResponseBatch({ batchRows: nextRows, colWidth: randomColCount });
    const realTimeReport: RTRealTimeReport = {
      message: '',
      response: [responseData],
      batchProgress: nextCount / this.fullRowData.length,
      rowIdx: this.genedRowCount
    };

    this.emit('out-data', realTimeReport);
    this.genedRowCount = nextCount;
    if (this.genedRowCount < this.fullRowData.length) {
      setTimeout(() => this.realStart(), DEFAULT_BATCH_GAP_TIME);
    }
  }
  send(message: any): this {
    // future usage for eating input
    return this;
  }
  end() {
    // end myself
  }

  do(event: string) {
    switch (event) {
      case 'err-exit':
        break;
      case 'out-end':
        break;
      case 'out-data':
        break;
      case 'end':
        break;
    }
  }
  genColumnOnce(columnWidth: number): Array<Array<string>> {
    const result: Array<Array<string>> = [];

    for (let i = 0; i < columnWidth; i++) {
      const nextIp =
        Math.round(Math.random() * 128 + 1) +
        '.' +
        Math.round(Math.random() * 255) +
        '.' +
        Math.round(Math.random() * 255) +
        '.' +
        Math.round(Math.random() * 255);
      result.push([nextIp]);
    }
    return result;
  }
  genDataOnce(rowHeight: number, columnWidth: number, sparcityRatio: number): Array<Array<number>> {
    const firstRow: Array<number> = [];
    for (let i = 0; i < columnWidth; i++) {
      firstRow.push(Math.random() * 99999);
    }
    firstRow.sort((a, b) => b - a);

    const allRows: Array<Array<number>> = [firstRow];
    for (let j = 1; j < rowHeight; j++) {
      let anotherRow: Array<number> = [];
      for (let i = 0; i < columnWidth; i++) {
        if (Math.random() > sparcityRatio) {
          anotherRow.push(Math.random() * 99999);
        } else {
          // tslint:disable-next-line:no-null-keyword
          anotherRow.push(null);
        }
      }
      allRows.push(anotherRow);
      anotherRow = [];
    }

    // faker.js in the future?
    // reportDataSet.push();
    return allRows;
  }
  genSumData(
    rowHeight: number,
    columnWidth: number,
    inData: Array<Array<number>>,
    outData: Array<Array<number>>
  ): Array<Array<number>> {
    const sumData: Array<Array<number>> = [];
    for (let j = 0; j < rowHeight; j++) {
      let anotherRow: Array<number> = inData[j].slice();
      for (let i = 0; i < columnWidth; i++) {
        anotherRow[i] += outData[j][i];
      }
      sumData.push(anotherRow);
      anotherRow = [];
    }
    return sumData;
  }
  genDataSetOnce(rowHeight: number, columnWidth: number, sparcityRatio: number): Array<RTReportDataBlock> {
    const statisticTypes = ['average', 'maximum', 'last', 'total', 'percentile'];
    const dataSet: Array<RTReportDataBlock> = [];

    statisticTypes.forEach((statisticType: string) => {
      let dataBlock: RTReportDataBlock;
      const inData = this.genDataOnce(rowHeight, columnWidth, sparcityRatio);
      dataBlock = {
        statistic: statisticType,
        trafficType: 'in',
        data: inData
      };
      dataSet.push(dataBlock);
      const outData = this.genDataOnce(rowHeight, columnWidth, sparcityRatio);
      dataBlock = {
        statistic: statisticType,
        trafficType: 'out',
        data: outData
      };
      dataSet.push(dataBlock);
      dataBlock = {
        statistic: statisticType,
        trafficType: 'sum',
        data: this.genSumData(rowHeight, columnWidth, inData, outData)
      };
      dataSet.push(dataBlock);
    });
    return dataSet;
  }

  genBreakdownResponseBatch(config: MockDataGenConfig): RTReportResponse {
    const testRowData: Array<string> = config.batchRows;
    const columnWidth = config.colWidth || DEFAULT_COLUMN_WIDTH;
    const randomColumn = this.genColumnOnce(columnWidth);
    const randomDataSet = this.genDataSetOnce(testRowData.length, columnWidth, config.sparcityRatio || 0.6);
    const dataResponse: RTReportResponse = {
      message: '',
      data: {
        keyField: [
          {
            fieldIndex: 303,
            side: 0
          }
        ],
        rowData: testRowData,
        columnData: randomColumn,
        originalColumnData: randomColumn,
        dataSet: randomDataSet
      },
      service: 'breakdown'
    };

    return dataResponse;
  }
}
