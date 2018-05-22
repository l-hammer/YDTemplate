/**
 * Created by LHammer on 18/05/03.
 * mock server
 */
const express = require('express');
const Bundler = require('parcel-bundler')

let proxypath;
const arguments = process.argv.splice(2);
switch (arguments[0]) {
  case 'app':
    proxypath = './src/app/index.html'; break;
  case 'web':
    proxypath = './src/web/index.html'; break;
  case 'appeg':
    proxypath = './src/examples/app/index.html'; break;
  case 'webeg':
    proxypath = './src/examples/web/index.html'; break;
  default: break;
}

const app = express()
const bundler = new Bundler(proxypath)
const port = Number(process.env.PORT || 1234);
const router = require('./util');

app.use('/webapi', router);
app.use('/wx', router);

const feedback = 'Interested in YDTemplate? Help me improve by sharing your feedback.';
const github = 'https://github.com/l-hammer/YDTemplate';
console.log(`\n\x1B[35m${feedback}\x1B[22m\x1B[39m\n\x1B[34m${github}\x1B[0m\n`);

app.use(bundler.middleware());
app.listen(port, () => {
  console.log(`Server running at \x1B[36mhttp://localhost:${port}\x1B[0m\n`);
})

// https://github.com/kentcdodds/cross-env/issues/121
process.on('SIGINT', () => {
  console.log();
  process.exit(0);
});