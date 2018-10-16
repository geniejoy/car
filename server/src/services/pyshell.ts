// rewrite python shell using typescript
// based on https://github.com/extrabacon/python-shell

import * as events from 'events';
import * as path from 'path';
import * as util from 'util';
import * as child_process from 'child_process';
import * as stream from 'stream';

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

interface Resolver {
  [index: string]: (data: any) => any;
}

/**
 * the execution options for python shell
 */
export interface PythonShellOptions {
  /**
   * mode: Configures how data is exchanged when data flows through stdin and stdout. The possible values are:
   *   text: each line of data (ending with "\n") is emitted as a message (default)
   *   json: each line of data (ending with "\n") is parsed as JSON and emitted as a message
   *   binary: data is streamed as-is through stdout and stdin
   */
  mode?: string;
  /**
   * formatter: each message to send is transformed using this method, then appended with "\n"
   */
  formatter?: (data: any) => any;
  /**
   * parser: each line of data (ending with "\n") is parsed with this function and its result is emitted as a message
   */
  parser?: (data: any) => any;
  /**
   * encoding: the text encoding to apply on the child process streams (default: "utf8")
   */
  encoding?: string;
  /**
   * pythonPath: The path where to locate the "python" executable. Default: "python"
   */
  pythonPath?: string;
  /**
   * pythonOptions: Array of option switches to pass to "python"
   */
  pythonOptions?: any[];
  /**
   * scriptPath: The default path where to look for scripts. Default is the current working directory.
   */
  scriptPath?: string;
  /**
   * args: Array of arguments to pass to the script
   */
  args?: string[];
}

/**
 * An interactive Python shell exchanging data through stdio
 * @param {string} script    The python script to execute
 * @param {object} [options] The launch options (also passed to child_process.spawn)
 * @constructor
 */
export class PythonShell extends EventEmitter {
  scriptArgs: any[];
  pythonOptions: any[];
  pythonPath: any;
  // allow global overrides for options
  static defaultOptions = {};
  script: string;
  command: Array<any>;
  mode: string;
  formatter: (data: any) => any;
  parser: (data: any) => any;
  terminated: boolean;
  childProcess: child_process.ChildProcess;
  stdin: stream.Writable;
  stdout: stream.Readable;
  stderr: stream.Readable;
  exitCode: number;
  stdoutHasEnded: boolean;
  stderrHasEnded: boolean;

  private _remaining: any;
  private _endCallback: any;

  constructor(script: string, options: any) {
    super();

    function resolve(type: string, val: any) {
      if (typeof val === 'string') {
        // use a built-in function using its name
        return PythonShell.resolvers[type][val];
      } else if (typeof val === 'function') {
        // use a custom function
        return val;
      }
    }

    let errorData = '';
    EventEmitter.call(this);

    options = Object.assign({}, PythonShell.defaultOptions, options);
    this.pythonPath = options.pythonPath || 'python';
    this.pythonOptions = toArray(options.pythonOptions);
    this.scriptArgs = toArray(options.args);

    this.script = path.join(options.scriptPath || './', script);
    this.command = this.pythonOptions.concat(this.script, this.scriptArgs);
    this.mode = options.mode || 'text';
    this.formatter = resolve('format', options.formatter || this.mode);
    this.parser = resolve('parse', options.parser || this.mode);
    this.terminated = false;
    this.childProcess = spawn(this.pythonPath, this.command, options);

    // ['stdout', 'stdin', 'stderr'].forEach((name) => {
    //     this[name] = this.childProcess[name];
    //     this.parser && this[name].setEncoding(options.encoding || 'utf8');
    // });
    this.stdout = this.childProcess.stdout;
    this.stdin = this.childProcess.stdin;
    this.stderr = this.childProcess.stderr;
    if (this.parser) {
      this.stdout.setEncoding(options.encoding || 'utf8');
      this.stderr.setEncoding(options.encoding || 'utf8');
    }
    // parse incoming data on stdout
    if (this.parser) {
      this.stdout.on('data', this.receive.bind(this));
    }

    // listen to stderr and emit errors for incoming data
    this.stderr.on('data', data => {
      errorData += '' + data;
    });

    this.stderr.on('end', () => {
      this.stderrHasEnded = true;
      this.terminateIfNeeded(errorData);
    });

    this.stdout.on('end', () => {
      this.stdoutHasEnded = true;
      this.terminateIfNeeded(errorData);
    });

    this.childProcess.on('exit', code => {
      this.exitCode = code;
      this.terminateIfNeeded(errorData);
    });
  }
  terminateIfNeeded(errorData: string) {
    if (!this.stderrHasEnded || !this.stdoutHasEnded || this.exitCode == undefined) {
      return;
    }
    let err;
    if (errorData || this.exitCode !== 0) {
      if (errorData) {
        err = this.parseError(errorData);
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
  static resolvers: { [index: string]: Resolver } = {
    // built-in formatters
    format: {
      text: data => {
        if (!data) return '';
        else if (typeof data !== 'string') return data.toString();
        return data;
      },
      json: data => {
        return JSON.stringify(data);
      }
    },

    // built-in parsers
    parse: {
      text: data => {
        return data;
      },
      json: data => {
        return JSON.parse(data);
      }
    }
  };

  /**
   * Runs a Python script and returns collected messages
   * @param  {string}   script   The script to execute
   * @param  {Object}   options  The execution options
   * @param  {Function} callback The callback function to invoke with the script results
   * @return {PythonShell}       The PythonShell instance
   */
  static run(script: any, options: any, callback: any) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }

    const pyshell = new PythonShell(script, options);
    const output: Array<any> = [];

    return pyshell
      .on('message', (message: any) => {
        output.push(message);
      })
      .end((err: any) => {
        if (err) return callback(err);
        // tslint:disable-next-line:no-null-keyword
        return callback(null, output.length ? output : null);
      });
  }

  /**
   * Parses an error thrown from the Python process through stderr
   * @param  {string|Buffer} data The stderr contents to parse
   * @return {Error} The parsed error with extended stack trace when traceback is available
   */
  parseError(data: string | Buffer) {
    const text = '' + data;
    let error;

    if (/^Traceback/.test(text)) {
      // traceback data is available
      const lines = ('' + data).trim().split(/\n/g);
      const exception = lines.pop();
      error = new Error(exception);
      (<any>error).traceback = data;
      // extend stack trace
      error.stack += '\n    ----- Python Traceback -----\n  ';
      error.stack += lines.slice(1).join('\n  ');
    } else {
      // otherwise, create a simpler error with stderr contents
      error = new Error(text);
    }

    return error;
  }

  /**
   * Sends a message to the Python shell through stdin
   * Override this method to format data to be sent to the Python process
   * @param {string|Object} data The message to send
   * @returns {PythonShell} The same instance for chaining calls
   */
  send(message: any) {
    let data = this.formatter ? this.formatter(message) : message;
    if (this.mode !== 'binary') data += '\n';
    this.stdin.write(data);
    return this;
  }

  /**
   * Parses data received from the Python shell stdout stream and emits "message" events
   * This method is not used in binary mode
   * Override this method to parse incoming data from the Python process into messages
   * @param {string|Buffer} data The data to parse into messages
   */
  receive(data: string | Buffer) {
    const parts = ('' + data).split(/\n/g);

    if (parts.length === 1) {
      // an incomplete record, keep buffering
      this._remaining = (this._remaining || '') + parts[0];
      return this;
    }

    const lastLine = parts.pop();
    // fix the first line with the remaining from the previous iteration of 'receive'
    parts[0] = (this._remaining || '') + parts[0];
    // keep the remaining for the next iteration of 'receive'
    this._remaining = lastLine;

    parts.forEach(part => {
      this.emit('message', this.parser(part));
    });

    return this;
  }

  /**
   * Closes the stdin stream, which should cause the process to finish its work and close
   * @returns {PythonShell} The same instance for chaining calls
   */
  end(callback: any) {
    this.childProcess.stdin.end();
    this._endCallback = callback;
    return this;
  }
}
