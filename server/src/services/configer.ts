import { Router, Request, Response } from 'express';
import * as os from 'os';
import {
  SubNetworkConfig,
  SubNetworkGroupConfig,
  SubNetworkTopnConfig,
  TopnKey,
  GenericConfigResult
} from '../models/atm-config-model';
import { MspCustomer } from '../models/msp-customer-model';
import { MockConfigs } from '../mocks/mock-config';

/**
 * implement the /api/config/xxx APIs
 */
export class AtmConfigerApi {
  public router: Router;
  configShell: any;

  /**
   * config routes for reporter jobs and results
   */
  constructor() {
    this.router = Router();
    this.router
      .get('/export/subnetwork/', (req: Request, res: Response) => this.getSubnetList(req, res))
      .get('/export/subnetwork/:id', (req: Request, res: Response) => this.getSubnetInfo(req, res))
      .get('/export/group/subnetwork/', (req: Request, res: Response) => this.getSubnetGroupList(req, res))
      .get('/export/topn/subnetwork/', (req: Request, res: Response) => this.getSubnetTopnList(req, res))
      .get('/export/mspcustomer/', (req: Request, res: Response) => this.getMspCustomerList(req, res))
      .get('/export/mspcustomer/:id', (req: Request, res: Response) => this.getMspCustomerInfo(req, res));
  }

  /**
   * gather the configs from mock or backend server
   */

  onInit() {
    if (process.env.MOCK_ATM) {
      this.configShell = new MockConfigs();
      this.configShell.onInit();
    } else {
      this.configShell = new MockConfigs();
      this.configShell.onInit();
    }
  }

  /**
   * get all the configs subnet info
   * @param req http request
   * @param res http response to return list of subnets
   */
  getSubnetList(req: Request, res: Response) {
    const result: GenericConfigResult<SubNetworkConfig> = {
      response: {
        status: 'succ',
        result: {
          output_file: 'mock.json',
          data: this.configShell.subnetList
        }
      }
    };
    res.status(200);
    res.json(result);
  }

  /**
   * get all the configs subnet info
   * @param req http request
   * @param res http response to return list of subnets
   */
  getSubnetInfo(req: Request, res: Response) {
    // ToDo
  }

  /**
   * get all the configs subnet info
   * @param req http request
   * @param res http response to return list of subnets
   */
  getSubnetGroupList(req: Request, res: Response) {
    const result: GenericConfigResult<SubNetworkGroupConfig> = {
      response: {
        status: 'succ',
        result: {
          output_file: 'mock.json',
          data: this.configShell.subnetGroupList
        }
      }
    };
    res.status(200);
    res.json(result);
  }

  /**
   * get all the configs subnet info
   * @param req http request
   * @param res http response to return list of subnets
   */
  getSubnetTopnList(req: Request, res: Response) {
    const result: GenericConfigResult<SubNetworkGroupConfig> = {
      response: {
        status: 'succ',
        result: {
          output_file: 'mock.json',
          data: this.configShell.subnetTopnList
        }
      }
    };
    res.status(200);
    res.json(result);
  }

  /**
   * get all the configs msp-customer info
   * @param req http request
   * @param res http response to return list of msp-customers
   */
  getMspCustomerList(req: Request, res: Response) {
    const result: GenericConfigResult<MspCustomer> = {
      response: {
        status: 'succ',
        result: {
          output_file: 'mock.json',
          data: this.configShell.customerList
        }
      }
    };
    res.status(200);
    res.json(result);
  }

  /**
   * get the config of msp-customer info by given id
   * @param req http request
   * @param res http response to return msp-customer
   */
  getMspCustomerInfo(req: Request, res: Response) {
    res.status(404);
    res.json({ result: 'msp-customer not support', originalReq: { id: req.params.id } });
    return;
  }
}
