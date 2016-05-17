var dev = require('./config/webpack.dev.js');
var prod = require('./config/webpack.prod.js');

var env = process.platform;
if (env.indexOf('win')) {
    module.exports = dev;
} else {
    module.exports = prod;
}
