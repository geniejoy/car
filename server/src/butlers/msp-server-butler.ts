import { MspServerInfo } from '../models/msp-server-model';
import * as dotenv from 'dotenv';
import { credentials, loadPackageDefinition } from 'grpc';
import { load } from '@grpc/proto-loader';
import { DispatchConfigRequest } from '../models/atm-api-model';

export class MspServerButler {
  mspMgmtProtocol: any;
  client: any;
  protoPath: string;

  constructor(protoPath: string) {
    this.protoPath = protoPath;
    // mock data
  }

  loadProto() {
    const options = {};
    load(this.protoPath, options)
      .then(packageDefinition => {
        const grpcPackage: any = loadPackageDefinition(packageDefinition);
        this.mspMgmtProtocol = grpcPackage.genie.msp;
        this.connect();
      })
      .catch(error => {
        console.log(`loadPackageDefinition() failure - ${error.message}`);
      });
  }

  connect() {
    this.client = new this.mspMgmtProtocol.console.MspServerService(
      process.env.MASTER_HOST + ':' + process.env.MASTER_PORT,
      credentials.createInsecure()
    );
  }

  /**
   * Implements the registerMspServer RPC method.
   */
  registerMspServer(serverInfo: MspServerInfo) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.RegisterMspServer(serverInfo, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          const mspServerInfo: MspServerInfo = response;
          // console.log('RegisterMspServer:', mspServerInfo);
          resolve(mspServerInfo);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the GetMspServersList RPC method.
   */
  GetMspServersList() {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.GetMspServersList({}, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          // console.log('GetMspServersList:', response.mspServers);
          resolve(response.mspServers);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the dispatchMspConfig RPC method.
   */
  dispatchMspConfig(request: DispatchConfigRequest) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.DispatchMspConfig(request, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  onInit() {
    this.loadProto();
  }
}
