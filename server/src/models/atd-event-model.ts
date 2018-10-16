import { Granularity, CounterIndex, DateTimeRange, DateTimeDuration, AtmResource } from './atm-base-model';

export interface AtdEventRequest {
  reportType: string;
  eventId: string;
  granularity: Granularity;
  counterIndex: CounterIndex;
  reportDateTime: DateTimeRange;
}

// todo:
// export interface EventDataPoint {
//     rsrcName: string;
//     value: number[];
// }
export type EventDataPoint = (string | number)[];

export interface AtdTrafficCharacteristic {
  // src/dest ip/port protocol tcp-flag
  name: string;
  // rsrc-name bps pps
  dataField: string[];
  data: EventDataPoint[];
}

export enum AtdEventStatusEnum {
  ONGOING = 'ONGOING',
  RECOVERED = 'RECOVERED'
}

export enum SeverityColorEnum {
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  RED = 'RED'
}

export enum WatermarkCondidtionEnum {
  OVER = 'OVER',
  UNDER = 'UNDER'
}

export enum AttackTypeEnum {
  DDOS = 'DDOS'
}

export interface AtdSeverity {
  type: SeverityColorEnum;
  watermark: WatermarkCondidtionEnum;
  thresholdValue: number;
  detectedValue: number;
  maxValue: number;
}

export interface AtdAttack {
  type: AttackTypeEnum;
  // e.g. TCP; SYN; FLOODING;
  name: string;
  // counter; label,  .e.g; TCP; Sync; bps;
  counter: string;
}

export interface AtdEvent {
  // 'AtdEvent-' + id; = ID;
  id: number;
  // ongoing; or; recovered;
  status: AtdEventStatusEnum;
  dateTime: DateTimeDuration;
  severity: AtdSeverity;
  attack: AtdAttack;
  // e.g. To; non - home, outgoing;
  direction: string;
  resource: AtmResource;
}

export interface AtdEventBlock {
  event: AtdEvent;
  trafficCharacteristics?: AtdTrafficCharacteristic[];
  networkElements?: string[];
}

export type AtdEventList = AtdEventBlock[];
