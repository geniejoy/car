import * as events from 'events';
import * as stream from 'stream';
import {
  EventListRequest,
  EventListResult,
  EventListRequestArgs,
  EventDetail
} from '../../models/atd/event-list-model';
import { EventPeakInfo, EventRouterCoverage } from '../../models/atd/event-base-model';
import { isUndefined } from 'util';
import { race } from 'q';

let eventIdSequence: number = 101;

export class MockAtdList extends events.EventEmitter {
  eventStatus: number[];
  eventDirections: number[];
  eventCounterIndexes: number[];
  eventSeverities: number[];
  routerList: Map<number, string>;
  recordStartTime: Date;
  recordEndTime: Date;
  interValMins: number = 10;
  requestArgs: EventListRequestArgs;
  constructor(private args: EventListRequestArgs) {
    super();
    this.requestArgs = args;
    if (!isUndefined(this.requestArgs.startTime)) {
      this.recordStartTime = new Date(this.requestArgs.startTime);
      this.recordEndTime = new Date(this.requestArgs.startTimeUntil);
    } else {
      this.recordStartTime = new Date();
      this.recordStartTime.setMinutes(this.recordStartTime.getMinutes() - this.interValMins);
      this.recordEndTime = new Date();
    }
    // 1 ongoing, 2 recover, 3 obsolete
    this.eventStatus = [1, 2, 3];
    // 0 local 1 remote
    this.eventDirections = [0, 1];
    // 1 bps 2 pps
    this.eventCounterIndexes = [1, 2];
    // 4 yellow 1 red
    this.eventSeverities = [4, 1];
    this.routerList = new Map<number, string>();
    for (let _i = 1; _i <= 10; _i++) {
      this.routerList.set(100 + _i, 'Router10' + _i);
    }
  }

  start() {
    // todo : random atd details
    // start sendingout mock data
    setImmediate(() => this.realStart());
  }

  realStart() {
    const responseData = this.generateBatch();
    this.emit('message', responseData);
  }

  getRandomNumber(val: number): number {
    return Math.floor(Math.random() * (val + 1));
  }

  generateDirection(): number {
    return this.eventDirections[this.getRandomNumber(this.eventDirections.length - 1)];
  }

  generateStatus(): number {
    return this.eventStatus[this.getRandomNumber(this.eventStatus.length - 1)];
  }

  generateCounterIndex(): number {
    return this.eventCounterIndexes[this.getRandomNumber(this.eventCounterIndexes.length - 1)];
  }

  generateSeverity(): number {
    return this.eventSeverities[this.getRandomNumber(this.eventSeverities.length - 1)];
  }

  generatePeakInfo(): EventPeakInfo[] {
    const flow_base: number = Number(process.env.ATD_FLOW_BASE || 10000);
    const flow_mag_base: number = Number(process.env.ATD_FLOW_MAG_BASE || 10000);
    const flow_mag_range: number = Number(process.env.ATD_FLOW_MAG_RANGE || 10);
    const peakValue: number = flow_mag_range * flow_mag_base + flow_base + Math.floor(Math.random() * flow_mag_base);
    const peakTime: Date = new Date(this.recordStartTime.getTime());
    peakTime.setMinutes(peakTime.getMinutes() + this.getRandomNumber(this.interValMins));
    const peakInfo: EventPeakInfo[] = [
      {
        routerCoverage: EventRouterCoverage.MAXIMUM_ROUTER,
        time: peakTime.toLocaleDateString() + ' ' + peakTime.toTimeString().slice(0, 5) + ':00',
        traffic: peakValue
      },
      {
        routerCoverage: EventRouterCoverage.PBOUNDARY_ROUTERSPS,
        time: peakTime.toLocaleDateString() + ' ' + peakTime.toTimeString().slice(0, 5) + ':00',
        traffic: peakValue
      }
    ];
    return peakInfo;
  }

  generateBatch(): EventDetail[] {
    const eventList: EventDetail[] = [];
    const startTime: Date = this.recordStartTime;
    let eventDetail: EventDetail;
    for (let _i = eventIdSequence; _i < eventIdSequence + 2; _i++) {
      eventDetail = this.generateMockEventDetail(_i, 1);
      eventList.push(eventDetail);
    }
    return eventList;
  }

  generateMockEventDetail(eventId: number, forceStatus?: number): EventDetail {
    let status: number = this.generateStatus();
    if (!isUndefined(forceStatus)) {
      status = forceStatus;
    }
    let eventDetail: EventDetail;
    const startTime: Date = this.recordStartTime;
    let peakInfo: EventPeakInfo[];
    let endTime: Date;
    let minsDiff: number;
    let routerName: string;
    endTime = new Date(this.recordStartTime.getTime());
    minsDiff = Math.floor(Math.random() * this.interValMins);
    endTime.setMinutes(endTime.getMinutes() + minsDiff);
    peakInfo = this.generatePeakInfo();
    routerName = this.routerList.get((eventIdSequence % 8) + 101);
    eventDetail = {
      eventId: eventId,
      startTime: startTime.toLocaleDateString() + ' ' + startTime.toTimeString().slice(0, 5) + ':00',
      threshold: Number(process.env.ATD_FLOW_BASE || 10000),
      endTime: endTime.toLocaleDateString() + ' ' + endTime.toTimeString().slice(0, 5) + ':00',
      counterIndex: this.generateCounterIndex(),
      status: status,
      direction: this.generateDirection(),
      peakTraffic: peakInfo[0].traffic,
      objectIndex: 6,
      severity: this.generateSeverity(),
      instanceIndex: 100,
      anomalyIndex: 1,
      ip: '192.0.101.' + ((eventIdSequence % 100) + 100),
      durationSecond: minsDiff * 60,
      triggeredInfo: {
        routerName: routerName,
        time: peakInfo[0].time,
        traffic: peakInfo[0].traffic,
        routerCoverage: EventRouterCoverage.MAXIMUM_ROUTER
      },
      ipVersion: 4,
      averageTraffic: [
        {
          traffic: peakInfo[0].traffic / minsDiff,
          routerCoverage: EventRouterCoverage.ALL_ROUTERS
        },
        {
          traffic: peakInfo[0].traffic / minsDiff,
          routerCoverage: EventRouterCoverage.PBOUNDARY_ROUTERSPS
        }
      ],
      severityRedInfo: {
        routerName: routerName,
        time: peakInfo[0].time,
        traffic: peakInfo[0].traffic,
        routerCoverage: EventRouterCoverage.MAXIMUM_ROUTER
      },
      peakInfo: this.generatePeakInfo()
    };
    return eventDetail;
  }

  generateRealTimeList(): EventDetail[] {
    const eventList: EventDetail[] = [];
    eventIdSequence = eventIdSequence + 2;
    for (let _i = 0; _i < 2; _i++) {
      eventList.push(this.generateMockEventDetail(eventIdSequence));
      eventIdSequence++;
    }
    return eventList;
  }

  generateRealTimeDetail(): EventDetail {
    const eventDetail: EventDetail = this.generateMockEventDetail(this.args.eventIds[0]);
    return eventDetail;
  }
}
