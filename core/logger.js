"use strict"
const fs = require('fs'),
    path = require('path'),
    winston = require('winston');
const today = new Date();
const datestr = today.getFullYear() + '' + ("0" + (today.getMonth() + 1)).slice(-2);

let dir = __dirname + '/../logs';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const filename = path.join(__dirname, '../logs/' + datestr + '.log');
let logger = new (winston.Logger)({
  transports: [
    // new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: filename })
  ]
});

module.exports = logger;
