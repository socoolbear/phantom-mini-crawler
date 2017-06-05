"use strict"

var webpage = require('webpage');

module.exports = function(data, done, worker) {
    var page = webpage.create();
    page.open(data.url, function() {
        // page.render(data.id + '.png');
        done(null);
    });
};
