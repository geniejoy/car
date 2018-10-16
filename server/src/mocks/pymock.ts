// mock python shell with atm mock data

import * as events from 'events';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import * as stream from 'stream';

import { MockRealTimeReport } from './mock-realtime-report';

const EventEmitter = events.EventEmitter;
const spawn = child_process.spawn;

function toArray(source: any) {
  if (typeof source === 'undefined' || source === null) {
    return [];
  } else if (!Array.isArray(source)) {
    return [source];
  }
  return source;
}

/**
 * An interactive mock shell exchanging data through mocks
 * @param {string} script    The python script to execute
 * @param {object} [options] The launch options (mocks care about option.args only)
 * @constructor
 */
export class PythonMock extends EventEmitter {
  scriptArgs: any[];
  pythonOptions: any[];
  pythonPath: any;
  // allow global overrides for options
  static defaultOptions = {};
  script: string;
  scriptName: string;
  command: Array<any>;
  mode: string;
  terminated: boolean;
  childProcess: child_process.ChildProcess;
  mockProcess: MockRealTimeReport;

  exitCode: number;
  stdoutHasEnded: boolean;
  stderrHasEnded: boolean;

  private _remaining: any;
  private _endCallback: any;

  constructor(script: string, options: any) {
    super();
    let errorData = '';
    EventEmitter.call(this);

    this.pythonPath = options.pythonPath || 'python';
    this.pythonOptions = toArray(options.pythonOptions);
    this.scriptArgs = toArray(options.args);

    this.script = path.join(options.scriptPath || './', script);
    this.scriptName = script;
    this.terminated = false;

    switch (this.scriptName) {
      case 'realtime_report_cgi.py':
        this.mockProcess = new MockRealTimeReport(this.scriptArgs);
        break;
      case 'msp_customer_cgi.py':
        // this.mockProcess = new MockMspCustomer(this.scriptArgs);
        // this.mockProcess = new MockMspCustomer();
        break;
      // future mocks here
      default:
        break;
    }

    this.mockProcess.on('out-data', this.receive.bind(this));
    // listen to stderr and emit errors for incoming data
    this.mockProcess.on('err-data', (data: any) => {
      errorData += '' + data;
    });

    this.mockProcess.on('err-end', () => {
      this.stderrHasEnded = true;
      this.terminateIfNeeded(errorData);
    });

    this.mockProcess.on('out-end', () => {
      this.stdoutHasEnded = true;
      this.terminateIfNeeded(errorData);
    });

    this.mockProcess.on('exit', (code: any) => {
      this.exitCode = code;
      this.terminateIfNeeded(errorData);
    });
  }
  start() {
    this.mockProcess.start();
  }
  terminateIfNeeded(errorData: string) {
    if (!this.stderrHasEnded || !this.stdoutHasEnded || this.exitCode == undefined) {
      return;
    }
    let err;
    if (errorData || this.exitCode !== 0) {
      if (errorData) {
        err = errorData;
      } else {
        err = new Error('process exited with code ' + this.exitCode);
      }
      err = Object.assign(err, {
        executable: this.pythonPath,
        options: this.pythonOptions.length ? this.pythonOptions : undefined,
        script: this.script,
        args: this.scriptArgs.length ? this.scriptArgs : undefined,
        exitCode: this.exitCode
      });
      // do not emit error if only a callback is used
      if (this.listeners('error').length || !this._endCallback) {
        this.emit('error', err);
      }
    }
    this.terminated = true;
    this.emit('close');
    this._endCallback && this._endCallback(err);
  }

  /**
   * Sends a message to the Python shell through stdin
   * Override this method to format data to be sent to the Python process
   * @param {string|Object} data The message to send
   * @returns {PythonShell} The same instance for chaining calls
   */
  send(message: any) {
    let data = message;
    if (this.mode !== 'binary') data += '\n';
    this.mockProcess.send(data);
    return this;
  }

  /**
   * re-emits "message" events
   * @param {string|Buffer} data The data to parse into messages
   */
  receive(data: string | Buffer) {
    this.emit('message', data);
    return this;
  }

  /**
   * Closes the stdin stream, which should cause the process to finish its work and close
   * @returns {PythonShell} The same instance for chaining calls
   */
  end(callback: any) {
    this.mockProcess.end();
    this._endCallback = callback;
    return this;
  }
}
