import { Router, Request, Response } from 'express';
import { PythonShell, PythonShellOptions } from './pyshell';
import * as os from 'os';
import {
  RealtimeReportArgs,
  RealtimeReportParams,
  RTReportResult,
  RTRealTimeReport
} from '../models/realtime-report-model';
import { PythonMock } from '../mocks/pymock';
interface PythonJob {
  jobId: number;
  pyShell: PythonShell | PythonMock;
  reqParams: RealtimeReportParams;
  results: Array<RTRealTimeReport>;
  progress: number;
}
export class AtmReporterApi {
  public router: Router;
  jobHistory: PythonJob[] = [];
  lastJobId = 1;
  static MAX_JOB_LIST_SIZE = 5;

  /**
   * config routes for reporter jobs and results
   */
  constructor() {
    this.router = Router();
    this.router
      .post('/jobs', (req: Request, res: Response) => this.postAtmReportJob(req, res))
      .get('/jobs', (req: Request, res: Response) => this.getAtmReportJobList(req, res))
      .get('/jobs/:jobId', (req: Request, res: Response) => this.getAtmReportJob(req, res))
      .get('/results/:jobId', (req: Request, res: Response) => this.getAtmReportResult(req, res));
  }

  /**
   * invoke realtime report python and store into job list then return the job id.
   * @param req http request with body contain the RealtimeReportParams
   * @param res http response to return status and job id if successfully added
   */
  postAtmReportJob(req: Request, res: Response) {
    // validate req.body
    const realtimeReqParams: RealtimeReportParams = <RealtimeReportParams>req.body;
    switch (realtimeReqParams.request[0].service) {
      case 'breakdown':
      case 'matrix':
        break;
      default:
        res.status(403);
        res.json({ result: 'service not support', originalReq: realtimeReqParams.request[0] });
        return;
    }

    const reqArgs = realtimeReqParams.request[0].args;
    const pyShellOptions: PythonShellOptions = {
      mode: 'json',
      scriptPath: os.homedir + '/bin/pysrc/realtime_report',
      args: ['--host', '127.0.0.1', JSON.stringify(realtimeReqParams)]
    };
    let realtimePyShell: PythonShell | PythonMock;
    if (process.env.MOCK_ATM) {
      realtimePyShell = new PythonMock('realtime_report_cgi.py', pyShellOptions);
      realtimePyShell.start();
    } else {
      realtimePyShell = new PythonShell('realtime_report_cgi.py', pyShellOptions);
    }
    const pyJob: PythonJob = {
      jobId: this.lastJobId++,
      pyShell: realtimePyShell,
      reqParams: realtimeReqParams,
      results: [],
      progress: 0
    };
    if (this.jobHistory.length >= AtmReporterApi.MAX_JOB_LIST_SIZE) {
      this.jobHistory.shift();
    }
    this.jobHistory.push(pyJob);
    res.status(200);
    res.json({ result: 'ok', jobId: pyJob.jobId, params: pyJob.reqParams });
    realtimePyShell.on('message', (message: RTRealTimeReport) => {
      pyJob.results.push(message);
      pyJob.progress = message.batchProgress;
      if (pyJob.progress === 1) {
        realtimePyShell.end(() => {
          console.log('python task done');
        });
      }
    });
  }
  findJobById(jobId: number): PythonJob {
    const jobsLen = this.jobHistory.length;
    let pyJob: PythonJob;
    for (let i = jobsLen - 1; i >= 0; i--) {
      if (this.jobHistory[i].jobId === jobId) {
        pyJob = this.jobHistory[i];
        break;
      }
    }
    return pyJob;
  }
  getAtmReportJobList(req: Request, res: Response) {
    const jobsLen = this.jobHistory.length;
    const pyJobList: any[] = [];
    for (let i = jobsLen - 1; i >= 0; i--) {
      pyJobList.push({
        jobId: this.jobHistory[i].jobId,
        progress: this.jobHistory[i].progress,
        offset: i
      });
    }
    res.status(200);
    res.json({ result: 'ok listing', jobList: pyJobList });
  }
  getAtmReportJob(req: Request, res: Response) {
    if (req.params.jobId) {
      const pyJob = this.findJobById(parseInt(req.params.jobId));
      if (pyJob) {
        res.status(200);
        res.json({ result: 'ok', jobId: req.params.jobId, job: pyJob });
      } else {
        res.status(404);
        res.json({ result: 'not found', jobId: req.params.jobId });
      }
    } else {
      res.status(404);
      res.json({ result: 'not found', jobId: req.params.jobId });
    }
  }
  getAtmReportResult(req: Request, res: Response) {
    if (req.params.jobId) {
      const pyJob = this.findJobById(parseInt(req.params.jobId));
      if (pyJob) {
        const startRow = parseInt(req.query.startRow) || 0;
        if (pyJob.progress > 0) {
          const result = pyJob.results.find(el => el.rowIdx === startRow);
          res.status(200);
          res.json({ result: 'ok', jobId: req.params.jobId, progress: pyJob.progress, report: result });
        } else {
          res.status(404);
          res.json({ result: 'in progress', jobId: pyJob.jobId, progress: pyJob.progress, report: undefined });
        }
      } else {
        res.status(404);
        res.json({ result: 'not found', jobId: req.params.jobId });
      }
    }
  }
}
