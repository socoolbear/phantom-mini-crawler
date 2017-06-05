"use strict"

// set logger
const fs = require('fs'),
    path = require('path'),
    winston = require('winston');
const today = new Date();
const datestr = today.getFullYear() + '' + ("0" + (today.getMonth() + 1)).slice(-2);
const filename = path.join(__dirname, '../logs/' + datestr + '.log');
let logger = new (winston.Logger)({
  transports: [
    // new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: filename })
  ]
});

// get pages
var http = require('http');

var options = {
  host: 'echo.jsontest.com',
  port: 80,
  path: '/key/value/one/two'
};

http.get(options, function(resp){
    let responseData = '';
  resp.on('data', function(chunk){
    responseData += chunk;
  });
  resp.on('end', function () {
    var dataObj = JSON.parse(responseData);
    // console.log("Raw Response: " +responseData);
let pages = [
    'http://www.google.com/',
    'http://www.example.com/',
    'http://www.stackoverflow.com/',
    'http://phantomjs.org/',
    'http://www.nodejs.org/',
    'http://www.reddit.com/',
    'http://www.youtube.com/',
    'http://www.amazon.com/'
];

// run
const Pool = require('phantomjs-pool').Pool;

function jobCallback(job, worker, index) {
    let url = pages[index];
    if (index < pages.length) {
        job({
            url : url,
            id : index
        }, (err) => {
            // Lets log if it worked
            if (err) {
                logger.log('error', 'There were some problems for url ' + url + ': ' + err.message);
            } else {
                logger.log('info', 'DONE: ' + url + '(' + index + ')');
            }
        });
    } else {
        job(null);
    }
}

let pool = new Pool({
    numWorkers : 10,
    jobCallback : jobCallback,
    phantomjsBinary : __dirname + '/../node_modules/.bin/phantomjs',
    workerFile : __dirname + '/worker.js' // location of our worker file (as an absolute path)
});

pool.start();
  });
}).on("error", function(e){
  console.log("Got error: " + e.message);
});


