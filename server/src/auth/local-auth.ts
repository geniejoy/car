import * as passport from 'passport';
import * as md5 from 'md5';
import { Strategy } from 'passport-local';
import { Application, Request, Response } from 'express';
// const LocalStrategy = require('passport-local').Strategy;
import { Pool, QueryResult } from 'pg';
import { getDatabaseConfig } from '../configs/database';

export class LocalAuth {
  app: Application;
  basePath: string;

  authIt(username: string, password: string, done: any) {
    const config = getDatabaseConfig();

    const pool = new Pool(config);
    pool.on('error', function(err, client) {
      console.error('idle client error', err.message, err.stack);
    });
    pool.connect(function(poolErr, poolClinet, poolDOne) {
      if (poolErr) {
        return console.error('pool client fetch error', poolErr);
      }
      poolClinet.query(
        "SELECT user_iid,user_password FROM conf_user_info WHERE user_status = '1' and user_id =$1",
        [username],
        (queryErr, queryRes) => {
          if (queryErr) {
            return console.error('query error', queryErr);
          }
          if (queryRes.rows[0] != undefined) {
            if (md5(password) === queryRes.rows[0].user_password) {
              // tslint:disable-next-line:no-null-keyword
              done(null, { id: queryRes.rows[0].user_iid });
            } else {
              // tslint:disable-next-line:no-null-keyword
              done(null, null);
            }
            poolDOne();
          } else {
            poolDOne();
            // tslint:disable-next-line:no-null-keyword
            done(null, null);
          }
        }
      );
    });
  }
  init() {
    passport.use(
      'local',
      new Strategy((username, password, done) => {
        this.authIt(username, password, done);
      })
    );
    this.app.post(
      `${this.basePath}/login`,
      passport.authenticate('local', { session: false }),
      (req: Request, res: Response) => {
        res.send('User ID ' + req.user.id);
      }
    );
  }
  constructor(app: Application, basePath: string) {
    this.app = app;
    this.basePath = basePath;
  }
}
