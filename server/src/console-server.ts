/**
 * Module dependencies.
 */
import * as express from 'express';
import * as compression from 'compression'; // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as errorHandler from 'errorhandler';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AtmReporterApi } from './services/reporter';
import { AtmConfigerApi } from './services/configer';

import { Props, Options } from './yoga-types';
import { GraphQLServer } from './yoga';

import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { context, resolvers } from './resolvers';
import { LocalAuth } from './auth/local-auth';

/**
 * Load environment variables from .env file, where credentials are configured.
 */
dotenv.config({ path: __dirname + '/env.atm6' });
const basePath = '/services/console';

// /**
//  * Start Express server.
//  */
// app.listen(app.get('port'), () => {
//   console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
//   console.log('  Press CTRL-C to stop\n');
// });

/**
 * graphql server based on graphql-yoga
 */
const typeDefs = importSchema(__dirname + '/schemas/schema.gql');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const serverGqlBasePath = `${basePath}/gql`;
const serverGqlPlayBasePath = `${basePath}/gqlplay`;
const serverGqlSubsBasePath = `${basePath}/gqlsub`;

const options: Options = {
  port: process.env.PORT ? +process.env.PORT : 4000,
  endpoint: serverGqlBasePath,
  subscriptionsEndpoint: serverGqlSubsBasePath,
  playgroundEndpoint: serverGqlPlayBasePath
};
const props: Props = { schema, context, options };

console.log('GraphQL Server is running on endpoint:%d ', options.port);
const server = new GraphQLServer(props);

// our extended express services
/**
 * Express configuration.
 */

server.express.set('port', process.env.PORT || 3000);
server.express.use(compression());
server.express.use(logger('dev'));
server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SNO
  })
);

// init configer first
const atmConfiger = new AtmConfigerApi();
atmConfiger.onInit();
server.express.use('/api/config', atmConfiger.router);
// configer must be inited before reporter
// mock reporter will query mock configer for the subnet list
const atmReporter = new AtmReporterApi();
server.express.use(basePath + '/atm-report', atmReporter.router);

/**
 * prepare my passport auth
 */
const localAuth = new LocalAuth(server.express, basePath);
localAuth.init();

/**
 * Error Handler. Provides full stack - remove for production
 */
server.express.use(errorHandler());

server.start(() =>
  console.log('Server is running on localhost:%d in %s mode', server.express.get('port'), server.express.get('env'))
);

module.exports = server;
