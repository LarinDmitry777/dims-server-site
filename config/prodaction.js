'use strict';

const configDefault = require('./default');

const config = {
    debug: false,
}

module.exports = {...configDefault, ...config };