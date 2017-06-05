"use strict"

const request = require('request-promise');
const options = {  url: 'http://echo.jsontest.com/key/value/one/two' };

const pages = request.get(options).then((body) => {
    // todo :: parsing the body
    let urls = [
        'http://www.google.com/',
        'http://www.example.com/',
        'http://www.stackoverflow.com/',
        'http://phantomjs.org/',
        'http://www.nodejs.org/',
        'http://www.reddit.com/',
        'http://www.youtube.com/',
        'http://www.amazon.com/'
    ];
    return new Promise((resolve, reject) => { resolve(urls); });
});

module.exports = pages;
