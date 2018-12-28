const config = require('./config.json');
const Dstat = require('./dstat.js');

new Dstat(config).start();