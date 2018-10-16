import {
  MspCustomer,
  MspCustomerLoc,
  MspCustomerUser,
  MspCustomerUserLoc,
  MspCustomerInput,
  MspCustomerRegisterInput
} from '../models/msp-customer-model';
import * as dotenv from 'dotenv';
import { credentials, GrpcObject, loadPackageDefinition } from 'grpc';
import { load } from '@grpc/proto-loader';

export class MspCustomerButler {
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

  onInit() {
    this.loadProto();
  }

  connect() {
    console.log(`connect to msp-master  ${process.env.MASTER_HOST}:${process.env.MASTER_PORT}`);
    this.client = new this.mspMgmtProtocol.portal.manage.MspCustomerService(
      process.env.MASTER_HOST + ':' + process.env.MASTER_PORT,
      credentials.createInsecure()
    );
  }

  /**
   * Implements the CreateCustomer RPC method.
   */
  createMspCustomer(args: MspCustomerRegisterInput): Promise<any> {
    const promise: Promise<object> = new Promise((resolve, reject) => {
      this.CreateCustomer(args.config)
        .then(result => {
          const tmpAdmin: MspCustomerUser = args.admin;
          tmpAdmin.customerId = result.id;
          this.CreatePortalUser(tmpAdmin)
            .then(adminResult => {
              const mspCustomer: MspCustomer = args.config;
              mspCustomer.id = result.id;
              this.CreateAtmCustomer(mspCustomer)
              .then( atmResult => {
                resolve({ config: result, admin: adminResult });
              }).catch(error => {
                reject(error);
              });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  updateMspCustomer(args: MspCustomerRegisterInput): Promise<any> {
    const promise: Promise<object> = new Promise((resolve, reject) => {
      this.UpdateCustomer(args.config)
        .then(result => {
          this.UpdatePortalUser(args.admin)
            .then(adminResult => {
              this.UpdateAtmCustomer(args.config)
              .then( atmResult => {
                resolve({ config: result, admin: adminResult });
              }).catch(error => {
                reject(error);
              });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  deleteMspCustomer(args: MspCustomerInput): Promise<any> {
    const promise: Promise<object> = new Promise((resolve, reject) => {
      this.DeleteCustomer(args)
        .then(result => {
          this.DeleteAtmCustomer(args)
          . then( delResult => {
            resolve(result);
          }).catch(error => {
            reject(error);
          });
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  }

  private CreateCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.CreateMspCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  private UpdateCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.UpdateMspCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  private DeleteCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.DeleteMspCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the CreatePortalUser RPC method.
   */
  private CreatePortalUser(user: MspCustomerUser) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.CreateMspCustomerAdmin(user, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the UpdatePortalUser RPC method.
   */
  private UpdatePortalUser(user: MspCustomerUser) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.UpdateMspCustomerUser(user, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the getMspCustomer RPC method.
   */
  getMspCustomer(customerLoc: MspCustomerLoc): Promise<MspCustomer> {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.GetMspCustomer(customerLoc, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the getMspCustomersList RPC method.
   */
  getMspCustomersList(customerLoc: MspCustomerLoc): Promise<MspCustomer[]> {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.GetMspCustomerList(customerLoc, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.customers ? response.customers : []);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the getMspCustomerUser RPC method.
   */
  getMspCustomerUser(userLoc: MspCustomerUserLoc) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.GetMspCustomerUser(userLoc, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  /**
   * Implements the getMspCustomerUserList RPC method.
   */
  getMspCustomerUserList(userLoc: MspCustomerUserLoc) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.GetMspCustomerUserList(userLoc, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.customerUsers);
        }
      });
    });
    return grpcPromise;
  }

  private CreateAtmCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.CreateAtmCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  private UpdateAtmCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.UpdateAtmCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }

  private DeleteAtmCustomer(customer: MspCustomer) {
    const grpcPromise = new Promise<any>((resolve, reject) => {
      this.client.DeleteAtmCustomer(customer, (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
    return grpcPromise;
  }
}
