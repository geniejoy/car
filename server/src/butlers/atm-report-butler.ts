import { AtmReportRequest, AtmReport, ReportFilter, AtmReportAdded } from '../models/atm-report-model';
import { MockAtmReport } from '../mocks/mock-atm-report';
import { PubSub } from '../yoga';

export class AtmReportButler {
  atmReporter: MockAtmReport;
  constructor() {}

  onInit() {
    this.atmReporter = new MockAtmReport();
    this.atmReporter.onInit();
  }

  querySubnetworkCompare(args: AtmReportRequest): Promise<AtmReport> {
    const jobPromise = new Promise<AtmReport>((resolve, reject) => {
      // todo if (process.env.MOCK_ATM) {
      this.atmReporter.start(args);
      this.atmReporter.on('message', (message: AtmReport) => {
        resolve(message);
        // todo this.atmReporter.end();
      });
    });
    return jobPromise;
  }

  subscribeAtmReportAdded(args: ReportFilter, pubsub: PubSub): AsyncIterator<AtmReportAdded> {
    const channel = Math.random()
      .toString(36)
      .substring(2, 15); // random channel name
    let count = 0;
    const genTimeOut = 5 * 1000;
    const generator = () => {
      const atmReportAdded = this.atmReporter.genSubnetworkCompareUpdate(args, count);
      pubsub.publish(channel, { atmReportAdded });
      count += 1;
      if (count < 24) {
        setTimeout(generator, genTimeOut);
      }
    };
    setTimeout(generator, genTimeOut);
    return pubsub.asyncIterator(channel);
  }
}
