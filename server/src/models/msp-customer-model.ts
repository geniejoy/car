export interface MspCustomer {
  serverId: number;
  id?: number;
  name: string;
  description?: string;
  appliedResource?: AppliedResource;
  networkScope?: NetworkScope;
}

export interface MspCustomerLoc {
  serverId?: number;
  customerName?: string;
}

export interface MspCustomerUserLoc {
  serverId: number;
  customerId: number;
  userName?: string;
  role?: number;
}

export interface MspCustomerUserRegistrationToken {
  token: string;
  password?: string;
}

export enum MspCustomerUserRole {
  USER = 0,
  ADMIN = 1
}

export enum MspCustomerUserStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  PENDING = 2
}

export interface MspCustomerUser {
  serverId: number;
  customerId: number;
  id?: number;
  userName: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status?: MspCustomerUserStatus;
  role?: MspCustomerUserStatus;
  activationToken?: string;
  activationExpires?: string;
}

export interface AppliedResource {
  numInstances?: number;
  numUsers?: number;
  mitigation?: MitigationService;
}

export interface MitigationService {
  enabled?: boolean;
  numIpPrefixes?: number;
}

export interface NetworkScope {
  ipAddressList?: (string | null)[];
  ipPrefixList?: (string | null)[];
  asNumberList?: (string | null)[];
  bgpInterAsPathList?: (string | null)[];
  bgpCommunityList?: (string | null)[];
  mplsRTList?: (number | null)[];
  mplsRDList?: (number | null)[];
}

// For operator-console GraphQL:
// request parameter for MSP Customer Creation
export interface MitigationServiceInput {
  enabled?: boolean;
  numIpPrefixes?: number;
}

export interface AppliedResourceInput {
  numInstances?: number;
  numUsers?: number;
  mitigation?: MitigationServiceInput;
}

export interface NetworkScopeInput {
  ipAddressList?: (string | null)[];
  ipPrefixList?: (string | null)[];
  asNumberList?: (string | null)[];
  bgpInterAsPathList?: (string | null)[];
  bgpCommunityList?: (string | null)[];
  mplsRTList?: (number | null)[];
  mplsRDList?: (number | null)[];
}

export interface MspCustomerLocInput {
  serverId?: number;
  customerName?: string;
}

export interface MspCustomerInput {
  serverId: number;
  id?: number;
  name: string;
  description?: string;
  appliedResource?: AppliedResourceInput;
  networkScope?: NetworkScopeInput;
}

export interface MspCustomerUserInput {
  serverId: number;
  customerId: number;
  id?: number;
  userName: string;
  email: string;
  role?: number;
}

export interface MspCustomerAdminInput {
  serverId: number;
  customerId: number;
  id?: number;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: number;
}

export interface MspCustomerRegisterInput {
  config: MspCustomerInput;
  admin: MspCustomerAdminInput;
}

export interface MspCustomerRegisterOutput {
  config: MspCustomer;
  admin: MspCustomerUser;
}
