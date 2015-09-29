var mqtt = require('mqtt');
var util = require('util');
var EventEmitter = require("events");

module.exports = MqttClient;
util.inherits(MqttClient, EventEmitter);

/**
 * Create a new instance of the Chirp MQTT Client
 * @param host
 * @param port
 * @param forceJSON
 * @constructor
 */
function MqttClient(host, port, forceJSON) {


}

/**
 * Set the submitted payload
 * @param payload
 * @returns {MqttClient}
 */
MqttClient.prototype.setPayload = function(payload) {

    this.payload = payload;
    return this;

};

/**
 *
 * @returns {MqttClient}
 */
MqttClient.prototype.send = function() {

    return this.client.publish(this.topic, this.payload);

};
