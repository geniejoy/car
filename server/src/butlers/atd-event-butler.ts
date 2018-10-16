import { MockAtdEvent } from '../mocks/mock-atd-event';
import { AtdEventRequest, AtdEventList } from '../models/atd-event-model';

export class AtdEventButler {
  atdEventer: MockAtdEvent;
  constructor() {}

  onInit() {
    this.atdEventer = new MockAtdEvent();
    this.atdEventer.onInit();
  }

  queryAtdEventList(args: AtdEventRequest): Promise<AtdEventList> {
    const jobPromise = new Promise<AtdEventList>((resolve, reject) => {
      // todo if (process.env.MOCK_ATM) {
      this.atdEventer.start(args);
      this.atdEventer.on('message', (message: AtdEventList) => {
        resolve(message);
        // todo atmReporter.end();
      });
    });
    return jobPromise;
  }
}
