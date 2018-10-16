var shell = require('shelljs');

shell.cp('-R', 'src/schemas', 'dist/');
shell.cp('-R', 'src/mocks/*.json', 'dist/mocks/');
shell.cp('-R', 'protos', 'dist/');
shell.cp('-R', 'package.json', 'dist/');

switch (process.env.NODE_ENV) {
  case 'dev':
    console.log('copy dev env');
    shell.cp('-R', 'config/env.dev.conf', 'dist/env.atm6');
    break;
  case 'local':
    console.log('copy local env');
    shell.cp('-R', 'config/env.local.conf', 'dist/env.atm6');
    break;
  case 'mock':
    console.log('copy mock env');
    shell.cp('-R', 'config/env.mock.conf', 'dist/env.atm6');
    break;
  case 'production':
    console.log('copy prod env');
    shell.cp('-R', 'config/env.prod.conf', 'dist/env.atm6');
    break;
  case 'stage':
    console.log('copy stage env');
    shell.cp('-R', 'config/env.stage.conf', 'dist/env.atm6');
    break;
  case 'vpn':
    console.log('copy vpn env');
    shell.cp('-R', 'config/env.vpn.conf', 'dist/env.atm6');
    break;
  default:
    console.log('copy prod env');
    shell.cp('-R', 'config/env.prod.conf', 'dist/env.atm6');
    break;
}

// cp to Server example
// from developer to pd1
// scp -r dist/* pd1:/home/tom/webapps/services
// copy to pd151 from pd1
// scp -r tom@192.168.80.1:/home/tom/webapps/services/* /home/genie/webapps
// registry = "https://registry.npmjs.org/"
// npm config set registry "https://151.101.88.162"
