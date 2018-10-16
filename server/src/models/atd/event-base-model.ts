export enum EventRouterCoverage {
  ALL_ROUTERS = 1,
  PBOUNDARY_ROUTERSPS = 2,
  MAXIMUM_ROUTER = 3
}

export interface EventTriggeredInfo {
  routerCoverage: EventRouterCoverage;
  routerName?: string;
  boundaryName?: string;
  time: string;
  traffic: number;
}

export interface EventSeverityRedInfo {
  routerCoverage: EventRouterCoverage;
  routerName?: string;
  boundaryName?: string;
  time: string;
  traffic: number;
}

export interface EventPeakInfo {
  routerCoverage: EventRouterCoverage;
  time: string;
  traffic: number;
}

export interface EventAverageTraffic {
  routerCoverage: EventRouterCoverage;
  traffic: number;
}

export interface EventScope {
  objectIndex: number;
  instanceIndex?: number[];
}

export interface EventDurationCompare {
  lessThan?: number;
  equalTo?: number;
  greaterThan?: number;
}

export interface EventTrafficCompare {
  lessThan?: number;
  equalTo?: number;
  greaterThan?: number;
}

export interface EventFieldSort {
  fieldName: string;
  sort: EventSortBy;
}

export enum EventSortBy {
  ASC = 'asc',
  DESC = 'desc'
}
