"use strict"

const pages = require('./core/pages.js');
const master = require('./core/master.js');

pages.then(master);
