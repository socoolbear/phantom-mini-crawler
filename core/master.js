"use strict"
const Pool = require('phantomjs-pool').Pool;
const logger = require('./logger.js');
let pages = [];

// set callback
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

module.exports = (urls) => {
    pages = urls;

    let pool = new Pool({
        numWorkers : 10,
        jobCallback : jobCallback,
        phantomjsBinary : __dirname + '/../node_modules/.bin/phantomjs',
        workerFile : __dirname + '/worker.js' // location of our worker file (as an absolute path)
    });
    pool.start();
};
