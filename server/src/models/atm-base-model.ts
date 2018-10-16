export enum Granularity {
  FIVE_MINS = '5 min',
  ONE_HOUR = '1 hour',
  ONE_DAY = '1 day'
}
// todo GranularityRvrs

export enum CounterIndex {
  BPS = 1,
  PPS = 2
}

export enum PeriodRange {
  DAILY = 'Daily',
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  QUARTERLY = 'Quarterly',
  RANGE_CUSTOM = 'Range'
}

export interface DateTimeRange {
  definedBy: PeriodRange;
  beginTime: string;
  endTime: string;
}

export interface DateTimeDuration {
  startTime: string;
  endTime?: string;
  duration: number;
}

export interface AtmResource {
  // home scope, sub-network
  type: string;
  // non-home, subnetwork name
  name: string;
  // optional ip for the resource
  ip?: string;
}
