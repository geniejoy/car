import { EventRouterCoverage } from './event-base-model';

export interface EventTraffic1MinRequest {
  service: 'eventTraffic1Min';
  args: EventTraffic1MinRequestArgs;
}

export interface EventTraffic1MinRequestArgs {
  eventIds: number[];
  routerCoverage: EventRouterCoverage;
  recordTimeStart?: string;
  recordTimeEnd?: string;
}

export interface EventTraffic1MinResult {
  message?: string;
  response: EventTraffic1MinResponse[];
}

export interface EventTraffic1MinResponse {
  message?: string;
  service: 'eventTraffic1Min';
  data: EventTraffic1Min[];
}

export interface EventTraffic1Min {
  eventId: number;
  threshold: number;
  counterIndex: number;
  routerTrafficData: EventRouterTrafficData[];
}

export interface EventRouterTrafficData {
  routerId: number;
  routerName: string;
  trafficData: EventTrafficData[];
}

export interface EventTrafficData {
  recTime: string;
  traffic: number;
}
