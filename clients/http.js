var request = require('request');
var util = require('util');
var EventEmitter = require("events");
var debug = require('debug')('chirp:http');

module.exports = HttpClient;
util.inherits(HttpClient, EventEmitter);

/**
 *
 * @param host
 * @param port
 * @param forceJSON
 * @constructor
 */
function HttpClient(url, method, verbose) {

    var self = this;

    // Sanitise the host if not already
    if(url.indexOf('http://') === -1) {
        url = 'http://' + url;
    }

    this.url = url;
    this.method = method;
    this.verbose = verbose;

    setTimeout(function() {
        self.emit('connected');
    }, 100)

}

/**
 * Set the submitted payload
 * @param payload
 * @returns {HttpClient}
 */
HttpClient.prototype.setPayload = function(payload) {

    debug('Setting payload to %o', payload)
    this.payload = payload;
    return this;

};

/**
 *
 * @returns {HttpClient}
 */
HttpClient.prototype.send = function() {

    var self = this;
    return request({url: this.url, method: this.method, json: this.payload}, function result(error, response, body) {
        if(error) {
            console.error(error);
        }
        else {
            if(self.verbose) {
                console.log(body);
            }
            else {
                debug(body);
            }
        }
    });

};
