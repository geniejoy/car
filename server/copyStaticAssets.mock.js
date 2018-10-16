var shell = require('shelljs');

// shell.cp('-R', 'env.atm6.prod', 'dist/env.atm6');
shell.cp('-R', 'env.atm6.mock', 'dist/env.atm6');
shell.cp('-R', 'src/schemas', 'dist/');
shell.cp('-R', 'src/mocks/*.json', 'dist/mocks/');
shell.cp('-R', 'protos', 'dist/');
shell.cp('-R', 'package.json', 'dist/');

// cp to Server example
// from developer to pd1
// scp -r dist/* pd1:/home/tom/webapps/services
// copy to pd151 from pd1
// scp -r tom@192.168.80.1:/home/tom/webapps/services/* /home/genie/webapps
// registry = "https://registry.npmjs.org/"
// npm config set registry "https://151.101.88.162"

