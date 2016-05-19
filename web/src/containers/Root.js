if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV);
    module.exports = require('./Root.prod.js');
} else {
    module.exports = require('./Root.prod.js');
}
