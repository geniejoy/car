export interface RealtimeReportArgs {
  startTime: string;
  startTimeUntil: string;
  objectIndex: string;
  instanceIndexList: number[];
  topNIndex: number;
  counterIndex: number;
  granularity: string;
  depth: number;
  statisticList: string[];
  trafficTypeList: string[];
  fieldCondition: any[];
  sortBy: { statistic: string; trafficeType: string };
  percentile: number;
}
export interface RealtimeReportParams {
  request: { service: string; args: RealtimeReportArgs }[];
}

export interface RTReportKeyField {
  fieldIndex: number;
  side: number;
}
export interface RTReportDataBlock {
  trafficType: 'sum' | 'in' | 'out';
  data: Array<Array<number | null>>;
  statistic: 'average' | 'maximum' | 'last' | 'total' | 'percentile' | string;
}

export interface RTReportResponse {
  message: string;
  data: {
    keyField: Array<RTReportKeyField>;
    rowData: Array<string>;
    columnData: Array<Array<string>>;
    originalColumnData: Array<Array<string>>;
    dataSet: Array<RTReportDataBlock>;
  };
  service: 'breakdown' | 'matrix';
}

/**
 * expected report format from python cgi
 */
export interface RTRealTimeReport {
  message: string;
  response: Array<RTReportResponse>;
  batchProgress: number;
  rowIdx: number;
}

/**
 * web api wrapping
 */
export interface RTReportResult {
  result: string;
  jobId: string;
  report: RTRealTimeReport;
}

/*
 * from ticket
 * {
    "service": "breakdown",
    "data" :
    {
        // row = instance index
        // column = keyfield
        "rowTotalLength": <int>,
        "columnTotalLength": <int>,
        "rowExportLength": <int>,
        "columnExportLength": <int>,

        "rowData": [<string>, <string>...],
        "columnData":
        [
            [<string>, <string>,...], ...
        ]
        "originalColumnData":
        [
	    [<string>, <string>,...], ...
        ]
        "keyField": [{
            "fieldIndex": <int>,
            "side": <int>
        }],
        "dataSet":
        [
            {
                "statistic": <string>,
                "trafficType": <string>,
                "data":
                [
                    [<float>, ...], ...
                ]
            }, ...
        ]


        // --detailed
        "_topNName": <string>
        "_keyFieldName": [<string>, ...],
        "_counterName": <string>
    }
}
 */
/*
 * from ticket
 {
    "service": "matrix",
    "data" :
    {
        //row = first keyfield
        //column = second keyfield
        "rowTotalLength": <int>,
        "columnTotalLength": <int>,
        "rowExportLength": <int>,
        "columnExportLength": <int>,

        "rowData": [<string>, <string>, ...]
        "columnData":
        [
	    [<string>, <string>,...], ...
        ],
        "originalRowData": [<string>, <string>, ...]
        "originalColumnData":
        [
	    [<string>, <string>,...], ...
        ]
        "keyField": [{
            "fieldIndex": <int>,
            "side": <int>
        }],
        "totalTraffic" : [{
            "statistic": <string>,
            "trafficType": <string>,
            "value" : <int>
        }],
        "dataSet":
        [
            {
                "statistic": <string>,
                "trafficType": <string>,
                "data":
                [
                    [<float>, ...], ...
                ]
            }, ...
        ]

        // --detailed
        "_topNName": <string>
        "_keyFieldName": [<string>, ...],
        "_counterName": <string>
    }
}
 * */
