// msp servers registered to the controller

export interface MspServerInfo {
  id: number;
  name: string;
  ipAddr: string;
  info?: SnmpWalkInfo;
  remarks?: string;
}
export interface SnmpWalkInfo {
  snmpId: string;
  modelNumber: string;
  adminStatus: number;
  operStatus: number;
  linkInfos?: SnmpLinkInfo[];
}

export interface SnmpLinkInfo {
  id: string;
  name: string;
  bandwidth: number;
}

export interface AgentClientInfo {
  id: number;
  ipAddr: string;
  agentClient: any;
}
