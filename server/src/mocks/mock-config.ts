import * as events from 'events';
import * as stream from 'stream';
import {
  SubNetworkConfig,
  SubNetworkGroupConfig,
  SubNetworkTopnConfig,
  TopnKey,
  GenericConfigResult
} from '../models/atm-config-model';
import { MspCustomer } from '../models/msp-customer-model';

const DEFAULT_SUBNET_COUNT = 192;
const DEFAULT_GROUP_COUNT = 16;

const mockSubnetTopnList: Array<SubNetworkTopnConfig> = [
  {
    index: '158',
    name: 'Inside Top Talker',
    key: [
      {
        type_name: 'ip_address',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '159',
    name: 'Outside Top Talker',
    key: [
      {
        type_name: 'ip_address',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '238',
    name: 'Into Interface',
    key: [
      {
        type_name: 'interface',
        side_id: '0'
      },
      {
        type_name: 'if_index',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps', 'fps', 'active_ip_inside', 'tcp_syn_ratio'],
    topn_number: '50',
    drill_down: '1',
    pivot: '1'
  },
  {
    index: '239',
    name: 'Out of Interface',
    key: [
      {
        type_name: 'interface',
        side_id: '1'
      },
      {
        type_name: 'if_index',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '240',
    name: 'Application',
    key: [
      {
        type_name: 'application'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '241',
    name: 'Protocol',
    key: [
      {
        type_name: 'ip_protocol'
      }
    ],
    counter: ['bps', 'pps', 'fps', 'tcp_bps', 'tcp_syn_ratio'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '242',
    name: 'Protocol + Port (Inside)',
    key: [
      {
        type_name: 'protocol_port',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '243',
    name: 'IP CoS',
    key: [
      {
        type_name: 'ip_cos',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '244',
    name: 'Protocol + Port (Outside)',
    key: [
      {
        type_name: 'protocol_port',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '246',
    name: 'Service',
    key: [
      {
        type_name: 'service',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps', 'active_ip_inside'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '248',
    name: 'Peer ASN and Origin ASN',
    key: [
      {
        type_name: 'peer_as_number'
      },
      {
        type_name: 'origin_as_number'
      }
    ],
    counter: ['bps', 'pps', 'fps'],
    topn_number: '50',
    drill_down: '1',
    pivot: '1'
  },
  {
    index: '249',
    name: 'IP Pair',
    key: [
      {
        type_name: 'ip_address',
        side_id: '0'
      },
      {
        type_name: 'ip_address',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps', 'fps', 'active_ip_inside', 'tcp_syn_ratio'],
    topn_number: '50',
    drill_down: '1',
    pivot: '1'
  },
  {
    index: '250',
    name: 'sub-network',
    key: [
      {
        type_name: 'sub_network',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '251',
    name: 'APP2',
    key: [
      {
        type_name: 'application'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '250',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '252',
    name: 'neighbor_in',
    key: [
      {
        type_name: 'neighbor',
        side_id: '0'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '253',
    name: 'sub_out',
    key: [
      {
        type_name: 'sub_network',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '254',
    name: 'fieldScopeSample',
    key: [
      {
        type_name: 'sub_network',
        side_id: '0'
      },
      {
        type_name: 'ip_address',
        side_id: '0'
      },
      {
        type_name: 'sub_network',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '1',
    pivot: '0'
  },
  {
    index: '255',
    name: 'sub_in_out',
    key: [
      {
        type_name: 'sub_network',
        side_id: '0'
      },
      {
        type_name: 'sub_network',
        side_id: '1'
      }
    ],
    counter: ['bps', 'pps'],
    topn_number: '50',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '256',
    name: 'sub_in_application',
    key: [
      {
        type_name: 'sub_network',
        side_id: '0'
      },
      {
        type_name: 'application'
      }
    ],
    counter: ['bps'],
    topn_number: '100',
    drill_down: '1',
    pivot: '1'
  },
  {
    index: '260',
    name: 'TCP_flag',
    key: [
      {
        type_name: 'tcp_flag'
      }
    ],
    counter: ['tcp_syn_ratio', 'tcp_pps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '0'
  },
  {
    index: '261',
    name: 'TCP_flag_AND_src_IP',
    key: [
      {
        type_name: 'tcp_flag'
      },
      {
        type_name: 'ip_address',
        side_id: '0'
      }
    ],
    counter: ['tcp_syn_ratio', 'bps'],
    topn_number: '100',
    drill_down: '0',
    pivot: '1'
  }
];
const mockTopnReportList = [
  'Inside Top Talker',
  'Outside Top Talker',
  'Into Interface',
  'Out of Interface',
  'Application',
  'Protocol',
  'Protocol + Port (Inside)',
  'IP CoS',
  'Protocol + Port (Outside)',
  'Service',
  'Peer ASN and Origin ASN',
  'IP Pair',
  'sub-network',
  'APP2',
  'neighbor_in',
  'sub_out',
  'fieldScopeSample',
  'sub_in_out',
  'sub_in_application',
  'TCP_flag',
  'TCP_flag_AND_src_IP'
];

let mockConfigsInstance: MockConfigs;

interface MockDataGenConfig {
  colWidth?: number;
  sparcityRatio?: number;
}
export class MockConfigs extends events.EventEmitter {
  public topnReportList = mockTopnReportList;
  public subnetList: Array<SubNetworkConfig>;
  public subnetGroupList: Array<SubNetworkGroupConfig>;
  public subnetTopnList: Array<SubNetworkTopnConfig> = mockSubnetTopnList;
  public customerList: Array<MspCustomer>;

  constructor() {
    super();
  }
  onInit() {
    // start sendingout mock data
    // init data
    this.subnetList = this.genSubnetList();
    this.subnetGroupList = this.genSubnetGroupList();
    this.customerList = this.genCustomerList();
    mockConfigsInstance = this;
  }

  public static getInstance() {
    return mockConfigsInstance;
  }

  send(message: any): this {
    // future usage for eating input
    return this;
  }
  end() {
    // end myself
  }
  genSubnetList(subnetCount = DEFAULT_SUBNET_COUNT): Array<SubNetworkConfig> {
    let startId = 100;
    const namePrefix = 'SN';
    let subnetIp: string;
    let subnetConfig: SubNetworkConfig;
    const result: Array<SubNetworkConfig> = [];
    for (let i = 0; i < subnetCount; i++) {
      subnetIp =
        Math.round(Math.random() * 128 + 1) +
        '.' +
        Math.round(Math.random() * 255) +
        '.' +
        Math.round(Math.random() * 255) +
        '.0/24';

      subnetConfig = {
        name: namePrefix + startId,
        id: (startId++).toString(),
        // chain_parent_name
        enabled: '1',
        // report,
        // remark,
        defined_by: {
          ip_address: [subnetIp]
        },
        topn_report: this.topnReportList
        // boundary_cut,
        // anommaly_detection
      };

      result.push(subnetConfig);
    }
    return result;
  }
  /**
   * generate all the groups, assumed all subnets are generated already
   * @param groupCount default count for groups
   */
  genSubnetGroupList(groupCount = DEFAULT_GROUP_COUNT): Array<SubNetworkGroupConfig> {
    const namePrefix = 'SNG';
    const groupMemberCount = this.subnetList.length / groupCount;
    let startId = 500;
    let lastSubnetIdx = 0;
    let subnetGroupConfig: SubNetworkGroupConfig;
    const result: Array<SubNetworkGroupConfig> = [];
    for (let i = 0; i < groupCount; i++) {
      subnetGroupConfig = {
        group_name: namePrefix + startId,
        group_id: (startId++).toString(),
        members: []
      };
      for (let j = 0; j < groupMemberCount; j++) {
        subnetGroupConfig.members.push(this.subnetList[lastSubnetIdx++].name);
      }
      result.push(subnetGroupConfig);
    }
    return result;
  }

  genCustomerList(): Array<MspCustomer> {
    let customerConfig: MspCustomer;
    const result: Array<MspCustomer> = [];
    customerConfig = {
      serverId: 6,
      id: 200,
      name: 'MSP Customer 1',
      description: 'mock msp-customer 1',
      appliedResource: {
        numInstances: 62,
        numUsers: 58,
        mitigation: {
          enabled: true,
          numIpPrefixes: 80
        }
      },
      networkScope: {
        ipAddressList: ['10.20.30.11', '10.20.30.100-10.20.30.200'],
        ipPrefixList: ['10.20.10.0/24', '10.20.11.100-10.20.11.200'],
        asNumberList: ['66', '88'],
        bgpInterAsPathList: ['[3 4 5]'],
        bgpCommunityList: ['36:88'],
        mplsRTList: [3262, 3268],
        mplsRDList: [66, 88]
      }
    };
    result.push(customerConfig);

    return result;
  }
}
