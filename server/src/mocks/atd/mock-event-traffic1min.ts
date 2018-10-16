import * as events from 'events';
import * as stream from 'stream';
import {
  EventTraffic1MinResult,
  EventTraffic1MinRequest,
  EventTraffic1Min,
  EventTrafficData,
  EventRouterTrafficData
} from '../../models/atd/event-traffic1min-model';
import { isUndefined } from 'util';

export class MockEventTraffic1Min extends events.EventEmitter {
  eventId: number;
  routerCoverage: number;
  recordStartTime: Date;
  recordEndTime: Date;
  routerList: Map<number, string>;
  constructor(eventId: number, routerCoverage: number, recordStartTime?: string, recordEndTime?: string) {
    super();
    this.eventId = eventId;
    this.routerCoverage = routerCoverage;
    if (!isUndefined(recordStartTime)) {
      this.recordStartTime = new Date(recordStartTime);
    } else {
      this.recordStartTime = new Date();
      this.recordStartTime.setMinutes(this.recordStartTime.getMinutes() - 10);
    }
    if (!isUndefined(recordEndTime)) {
      this.recordEndTime = new Date(recordEndTime);
    } else {
      this.recordEndTime = new Date();
    }
    this.routerList = new Map<number, string>();
    for (let _i = 1; _i <= 10; _i++) {
      this.routerList.set(100 + _i, 'Router10' + _i);
    }
  }
  start() {
    // todo : random atd events
    // start sendingout mock data
    setImmediate(() => this.realStart());
  }
  realStart() {
    const responseData = this.generateTraffic();
    this.emit('message', responseData);
  }

  generateTraffic(): EventTraffic1Min {
    let eventTraffic1Min: EventTraffic1Min;
    eventTraffic1Min = this.generateTrafficDataSet(this.recordStartTime, this.recordEndTime);
    return eventTraffic1Min;
  }

  generateRealTimeTraffic(): EventTraffic1Min {
    let eventTraffic1Min: EventTraffic1Min;
    // set 1 min time range
    const recordEndTime = new Date();
    const reportStartTime = new Date();
    reportStartTime.setSeconds(reportStartTime.getSeconds() - 59);
    eventTraffic1Min = this.generateTrafficDataSet(reportStartTime, recordEndTime);
    return eventTraffic1Min;
  }

  generateTrafficDataSet(recStartTime: Date, recEndTime: Date): EventTraffic1Min {
    let traffic1MinSet: EventTraffic1Min;
    const routerDataSet: EventRouterTrafficData[] = [];
    let dataSet: EventTrafficData[];
    const minsDiff = Math.round((recEndTime.getTime() - recStartTime.getTime()) / 60000);
    let recTime: Date;
    const rBase: number = (this.eventId % 8) + 1;
    const rBases: number[] = [rBase, rBase + 1, rBase + 2];
    for (let _j = 1; _j <= rBases.length; _j++) {
      recTime = new Date(recEndTime.getTime());
      dataSet = [];
      for (let _i = 1; _i <= minsDiff; _i++) {
        dataSet.push({
          recTime: recTime.toLocaleDateString() + ' ' + recTime.toTimeString().slice(0, 5) + ':00',
          traffic: this.generateRandomFlow()
        });
        recTime.setMinutes(recTime.getMinutes() - _i);
      }
      routerDataSet.push({
        routerId: 100 + _j,
        routerName: this.routerList.get(100 + _j),
        trafficData: dataSet
      });
    }
    traffic1MinSet = {
      eventId: this.eventId,
      threshold: Number(process.env.ATD_FLOW_BASE || 10000),
      counterIndex: 1,
      routerTrafficData: routerDataSet
    };
    return traffic1MinSet;
  }

  generateRandomFlow(): number {
    const flow_base: number = Number(process.env.ATD_FLOW_BASE || 10000);
    const flow_mag_base: number = Number(process.env.ATD_FLOW_MAG_BASE || 10000);
    const flow_mag_range: number = Number(process.env.ATD_FLOW_MAG_RANGE || 10);
    return Math.floor(Math.random() * flow_mag_range) * flow_mag_base + flow_base;
  }
}
