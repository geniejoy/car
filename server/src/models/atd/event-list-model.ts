import {
  EventTriggeredInfo,
  EventSeverityRedInfo,
  EventAverageTraffic,
  EventPeakInfo,
  EventScope,
  EventDurationCompare,
  EventTrafficCompare,
  EventFieldSort
} from './event-base-model';

export interface EventListRequest {
  service: 'eventList';
  args: EventListRequestArgs;
}

export interface EventListRequestArgs {
  startTime?: string;
  startTimeUntil?: string;
  severity?: number;
  scope?: EventScope[];
  anomalyIndex?: number;
  direction?: number;
  counterIndex?: number[];
  status?: number;
  durationCompare?: EventDurationCompare;
  trafficCompare?: EventTrafficCompare;
  ip?: string;
  eventIds?: number[];
  sortBy?: EventFieldSort;
  outputLimit?: number;
  outputOffset?: number;
}

export interface EventListResult {
  message?: string;
  response: EventListResponse[];
}

export interface EventListResponse {
  message?: string;
  service: 'eventList';
  data: EventDetail[];
}

export interface EventDetail {
  eventId: number;
  startTime: string;
  endTime: string;
  durationSecond: number;
  status: number;
  severity: number;
  anomalyIndex: number;
  direction: number;
  counterIndex: number;
  threshold: number;
  objectIndex: number;
  instanceIndex: number;
  ip: string;
  ipVersion: number;
  triggeredInfo: EventTriggeredInfo;
  severityRedInfo: EventSeverityRedInfo;
  peakInfo: EventPeakInfo[];
  peakTraffic: number;
  averageTraffic: EventAverageTraffic[];
}
