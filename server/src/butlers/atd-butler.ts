import { MockAtdList } from '../mocks/atd/mock-event-list';
import { EventListRequestArgs, EventDetail } from '../models/atd/event-list-model';
import { MockEventTraffic1Min } from '../mocks/atd/mock-event-traffic1min';
import { EventTraffic1Min } from '../models/atd/event-traffic1min-model';
import { PubSub } from '../yoga';

export class AtdButler {
  constructor() {}

  queryList(args: EventListRequestArgs): Promise<EventDetail[]> {
    const jobPromise = new Promise<EventDetail[]>((resolve, reject) => {
      let atdEventer;
      // todo if (process.env.MOCK_ATM) {
      atdEventer = new MockAtdList(args);
      atdEventer.start();
      atdEventer.on('message', (message: EventDetail[]) => {
        resolve(message);
        // todo atmReporter.end();
        atdEventer = undefined;
      });
    });
    return jobPromise;
  }

  queryTraffic1Min(
    eventId: number,
    routerCoverage: number,
    recordTimeStart?: string,
    recordTimeEnd?: string
  ): Promise<EventTraffic1Min> {
    const jobPromise = new Promise<EventTraffic1Min>((resolve, reject) => {
      let atdTrafficr;
      // todo if (process.env.MOCK_ATM) {
      atdTrafficr = new MockEventTraffic1Min(eventId, routerCoverage, recordTimeStart, recordTimeEnd);
      atdTrafficr.start();
      atdTrafficr.on('message', (message: EventTraffic1Min) => {
        resolve(message);
        // todo atmReporter.end();
        atdTrafficr = undefined;
      });
    });
    return jobPromise;
  }

  subscribeListAdded(args: EventListRequestArgs, pubsub: PubSub): AsyncIterator<EventDetail[]> {
    const channel = Math.random()
      .toString(36)
      .substring(2, 15); // random channel name
    let count = 0;
    const genTimeOut = this.getAtdSubscribeInterval();
    const generator = () => {
      let atdEventer;
      atdEventer = new MockAtdList(args);
      const atdEventListAdded = atdEventer.generateRealTimeList();
      pubsub.publish(channel, { atdEventListAdded });
      count += 1;
      if (count < 24) {
        setTimeout(generator, genTimeOut);
      }
    };
    setTimeout(generator, genTimeOut);
    return pubsub.asyncIterator(channel);
  }

  subscribeDetailAdded(eventId: number, pubsub: PubSub): AsyncIterator<EventDetail> {
    const channel = Math.random()
      .toString(36)
      .substring(2, 15); // random channel name
    let count = 0;
    const genTimeOut = this.getAtdSubscribeInterval();
    const generator = () => {
      let atdTrafficr;
      const args: EventListRequestArgs = {};
      args.eventIds = [eventId];
      atdTrafficr = new MockAtdList(args);
      const atdEventDetailAdded = atdTrafficr.generateRealTimeDetail();
      pubsub.publish(channel, { atdEventDetailAdded });
      count += 1;
      if (count < 24) {
        setTimeout(generator, genTimeOut);
      }
    };
    setTimeout(generator, genTimeOut);
    return pubsub.asyncIterator(channel);
  }

  subscribeTraffic1MinAdded(eventId: number, routerCoverage: number, pubsub: PubSub): AsyncIterator<EventTraffic1Min> {
    const channel = Math.random()
      .toString(36)
      .substring(2, 15); // random channel name
    let count = 0;
    const genTimeOut = this.getAtdSubscribeInterval();
    const generator = () => {
      let atdTrafficr;
      atdTrafficr = new MockEventTraffic1Min(eventId, routerCoverage);
      const atdEventTraffic1MinAdded = atdTrafficr.generateRealTimeTraffic();
      pubsub.publish(channel, { atdEventTraffic1MinAdded });
      count += 1;
      if (count < 24) {
        setTimeout(generator, genTimeOut);
      }
    };
    setTimeout(generator, genTimeOut);
    return pubsub.asyncIterator(channel);
  }

  /**
   * Interval of subscription
   * @return {number} Microseconds
   */
  getAtdSubscribeInterval(): number {
    return Number(process.env.ATD_SUBSCRIBE_INTERVAL || 60) * 1000;
  }
}
