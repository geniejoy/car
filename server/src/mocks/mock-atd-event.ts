import * as events from 'events';
import * as stream from 'stream';
import { AtmReportRequest, AtmReport, ReportData } from '../models/atm-report-model';
import {
  AtdEventRequest,
  AtdEvent,
  AtdEventList,
  AtdEventBlock,
  AtdEventStatusEnum,
  SeverityColorEnum,
  WatermarkCondidtionEnum,
  AttackTypeEnum,
  AtdTrafficCharacteristic
} from '../models/atd-event-model';
import {
  SubNetworkConfig,
  SubNetworkGroupConfig,
  SubNetworkTopnConfig,
  TopnKey,
  GenericConfigResult
} from '../models/atm-config-model';
import { MockConfigs } from './mock-config';
import { setTimeout } from 'timers';

// mock generator configs
interface MockAtdEventGenConfig {
  batchRows: Array<number>;
  colWidth?: number;
}

export class MockAtdEvent extends events.EventEmitter {
  requestArgs: AtdEventRequest;
  mockConfigs: MockConfigs;
  eventset: any;
  constructor() {
    super();
  }
  onInit() {
    // todo dynamic generate
    this.eventset = require('./anomaly-event-list.json').response.result.data;
  }
  start(args: AtdEventRequest) {
    this.requestArgs = args;
    // todo : random atd events
    // start sendingout mock data
    setImmediate(() => this.realStart());
    // todo dynamic generate
    this.eventset = require('./anomaly-event-list.json');
  }
  realStart() {
    const nextCount = 12;
    const nextRows = this.eventIdList.slice(0, nextCount);
    const responseData = this.genAtdEventBatch({ batchRows: nextRows, colWidth: nextCount });
    const atdEventList: AtdEventList = responseData;

    this.emit('message', atdEventList);

    // todo pregressive python script or redis sub/pub
    // this.genedRowCount = nextCount;
    // if (this.genedRowCount < this.fullRowData.length) {
    //     setTimeout(() => this.realStart(), DEFAULT_BATCH_GAP_TIME);
    // }
  }

  genAtdEventBatch(config: MockAtdEventGenConfig): AtdEventList {
    let eventList: AtdEventList;
    eventList = this.eventset.map((value: any, index: any) => {
      return { event: value };
    });
    eventList[0].trafficCharacteristics = this.event1026TrafficCharacteristics;
    return eventList;
  }
  // todo random generate this eventset
  private eventIdList = [1026, 820, 819, 890, 1031, 1028, 1027, 1019, 1018, 1020, 675, 1022];
  //#region mock data
  private event1026TrafficCharacteristics: AtdTrafficCharacteristic[] = [
    {
      name: 'Source IP',
      dataField: ['IP Address(Source)', 'bps', 'pps'],
      data: [
        ['58.221.40.131', 507168928, 59638.89],
        ['58.221.37.226', 501737792, 59000],
        ['58.220.31.74', 316065344, 37166.67],
        ['58.221.38.86', 291498208, 34277.78],
        ['58.216.9.160', 270474688, 31805.56],
        ['61.160.254.101', 90300000, 10750],
        ['218.93.9.120', 84095112, 9888.89],
        ['183.60.153.194', 54258668, 6527.78],
        ['58.215.19.184', 32095558, 3972.22],
        ['58.221.103.3', 19333778, 2750],
        ['222.186.3.81', 15037779, 1861.11],
        ['222.187.96.123', 11446667, 1416.67],
        ['218.93.12.70', 11409111, 1527.78],
        ['61.155.238.86', 8977778, 1111.11],
        ['58.216.213.58', 7930667, 1055.56],
        ['222.186.55.230', 6696667, 972.22]
      ]
    },
    {
      name: 'Destination IP',
      dataField: ['IP Address(Destination)', 'bps', 'pps'],
      data: [['183.131.69.62', 2311510272, 295333.34]]
    },
    {
      name: 'Source Protocol Port',
      dataField: ['Protocol Port(Source)', 'bps', 'pps'],
      data: [
        ['TCP(6):0', 1886942720, 221888.89],
        ['TCP(6):48273', 472444.47, 55.56],
        ['TCP(6):52926', 467111.12, 55.56],
        ['TCP(6):52722', 467111.12, 55.56],
        ['TCP(6):55359', 466666.69, 55.56],
        ['TCP(6):20539', 466666.69, 55.56],
        ['TCP(6):20456', 466666.69, 55.56],
        ['TCP(6):34544', 460666.69, 55.56],
        ['TCP(6):15401', 448888.91, 55.56],
        ['TCP(6):63989', 415777.78, 55.56],
        ['TCP(6):59069', 236222.23, 27.78],
        ['TCP(6):52447', 236222.23, 27.78],
        ['TCP(6):55733', 236222.23, 27.78],
        ['TCP(6):55946', 236222.23, 27.78],
        ['TCP(6):27835', 236222.23, 27.78],
        ['TCP(6):26334', 236222.23, 27.78]
      ]
    },
    {
      name: 'Destination Protocol Port',
      dataField: ['Protocol Port(Destination)', 'bps', 'pps'],
      data: [['TCP(6):24071', 2311510272, 295333.34]]
    },
    {
      name: 'Protocol',
      dataField: ['IP Protocol', 'bps', 'pps'],
      data: [['TCP(6)', 2311510272, 295333.34]]
    },
    {
      name: 'TCP Flag',
      dataField: ['TCP Flag', 'bps', 'pps'],
      data: [['----S-(2)', 2311510272, 295333.34]]
    }
  ];
  //#endregion
}
