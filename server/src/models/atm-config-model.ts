/**
 * response model for the api/config/export/subnetwork
 */
export interface SubNetworkConfig {
  name: string;
  id: string;
  chain_parent_name?: string;
  enabled: string; // '0' or '1'
  defined_by: {
    ip_address: Array<string>;
  };
  topn_report: Array<string>;
  boundary_cut?: any;
  anommaly_detection?: any;
  report?: string;
  remarks?: string;
}

/**
 * response model for the api/config/export/group/subnetwork
 */
export interface SubNetworkGroupConfig {
  group_name: string;
  group_id: string;
  members: Array<string>;
}

export enum CounterEnum {
  Bps = 'bps',
  Pps = 'pps',
  Fps = 'fps',
  ActiveIpInside = 'active_ip_inside',
  TcpSynRatio = 'tcp_syn_ratio',
  TcpBps = 'tcp_bps',
  TcpPps = 'tcp_pps'
}
/**
 * topn key
 */
export interface TopnKey {
  type_name: string;
  side_id?: string;
}
/**
 * response model for the api/config/export/topn/subnetwork
 */
export interface SubNetworkTopnConfig {
  index: string;
  name: string;
  key: Array<TopnKey>;
  counter: Array<string>;
  topn_number: string;
  drill_down: string;
  pivot: string;
}

/**
 * config result common base format
 */
export interface GenericConfigResult<T> {
  response: {
    status: string;
    result: {
      output_file: string;
      data: Array<T>;
    };
  };
}
