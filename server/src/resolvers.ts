import { AtmReportButler } from './butlers/atm-report-butler';
import { AtdEventButler } from './butlers/atd-event-butler';
import { AtdButler } from './butlers/atd-butler';
import { MspCustomerButler } from './butlers/msp-customer-butler';
import { MspServerButler } from './butlers/msp-server-butler';
import { PubSub } from './yoga';

/**
 * context is like our server side DI pool
 * refactor with DI system later
 */
interface Context {
  atmReportButler: AtmReportButler;
  atdEventButler: AtdEventButler;
  atdButler: AtdButler;
  mspCustomerButler: MspCustomerButler;
  mspServerButler: MspServerButler;
  pubsub: PubSub;
}
const PROTO_PATH = __dirname + '/protos/genie/msp/console/msp_mgmt.proto';

export const context = {
  atmReportButler: new AtmReportButler(),
  atdEventButler: new AtdEventButler(),
  atdButler: new AtdButler(),
  mspCustomerButler: new MspCustomerButler(PROTO_PATH),
  mspServerButler: new MspServerButler(PROTO_PATH),
  pubsub: new PubSub()
};

context.atmReportButler.onInit();
context.atdEventButler.onInit();
context.mspCustomerButler.onInit();
context.mspServerButler.onInit();

export const resolvers = {
  Query: {
    hello: () => `Hello`,
    productInfo: () => {
      return { prodVersion: '0.0.1', prodName: 'portal' };
    },
    atmReport: (parent: any, args: any, ctx: Context) => {
      return ctx.atmReportButler.querySubnetworkCompare(args);
    },
    atdEvents: (parent: any, args: any, ctx: Context) => {
      return ctx.atdEventButler.queryAtdEventList(args);
    },
    atdEventList: (parent: any, args: any, ctx: Context) => {
      return ctx.atdButler.queryList(args);
    },
    atdEventTraffic1Min: (parent: any, args: any, ctx: Context) => {
      return ctx.atdButler.queryTraffic1Min(
        args.eventId,
        args.routerCoverage,
        args.recordStartTime,
        args.recordEndTime
      );
    },
    mspServersList: (parent: any, args: any, ctx: Context) => {
      return ctx.mspServerButler.GetMspServersList();
    },
    mspCustomer: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.getMspCustomer(args.customerLoc);
    },
    mspCustomersList: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.getMspCustomersList(args.customerLoc);
    },
    mspCustomerUser: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.getMspCustomerUser(args.userLoc);
    },
    mspCustomerUserList: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.getMspCustomerUserList(args.userLoc);
    }
  },
  ProductInfo: {
    prodVersion: () => '0.0.1',
    prodName: () => 'portal'
  },
  Counter: {
    countStr: (counter: any) => `Current count: ${counter.count}`
  },
  Mutation: {
    createMspCustomer: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.createMspCustomer(args.mspCustomerRegisterInput);
    },
    updateMspCustomer: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.updateMspCustomer(args.mspCustomerRegisterInput);
    },
    deleteMspCustomer: (parent: any, args: any, ctx: Context) => {
      return ctx.mspCustomerButler.deleteMspCustomer(args.mspCustomerInput);
    },
    registerMspServer: (parent: any, args: any, ctx: Context) => {
      return ctx.mspServerButler.registerMspServer(args);
    },
    dispatchMspConfig: (parent: any, args: any, ctx: Context) => {
      return ctx.mspServerButler.dispatchMspConfig(args.dispatchConfigRequest);
    }
  },
  // todo StrDateTime?: GraphQLScalarType;
  Subscription: {
    counter: {
      subscribe: (parent: any, args: any, ctx: Context) => {
        const channel = Math.random()
          .toString(36)
          .substring(2, 15); // random channel name
        let count = 0;
        setInterval(() => ctx.pubsub.publish(channel, { counter: { count: count++ } }), 2000);
        return ctx.pubsub.asyncIterator(channel);
      }
    },
    atmReportAdded: {
      subscribe: (parent: any, args: any, ctx: Context) => {
        return ctx.atmReportButler.subscribeAtmReportAdded(args, ctx.pubsub);
      }
    },
    atdEventListAdded: {
      subscribe: (parent: any, args: any, ctx: Context) => {
        return ctx.atdButler.subscribeListAdded(args, ctx.pubsub);
      }
    },
    atdEventDetailAdded: {
      subscribe: (parent: any, args: any, ctx: Context) => {
        return ctx.atdButler.subscribeDetailAdded(args.eventId, ctx.pubsub);
      }
    },
    atdEventTraffic1MinAdded: {
      subscribe: (parent: any, args: any, ctx: Context) => {
        return ctx.atdButler.subscribeTraffic1MinAdded(args.eventId, args.routerCoverage, ctx.pubsub);
      }
    }
  }
};
