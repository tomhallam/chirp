var mqtt = require('mqtt');
var util = require('util');
var EventEmitter = require("events");
var debug = require('debug')('chirp:mqtt');

module.exports = MqttClient;
util.inherits(MqttClient, EventEmitter);

/**
 * Create a new instance of the Chirp MQTT Client
 * @param host
 * @param port
 * @param topic
 * @param forceJSON
 * @constructor
 */
function MqttClient(host, port, topic, forceJSON) {

    var self = this;
    EventEmitter.call(this);

    this.host = host;
    this.port = port;
    this.payload = "hey";
    this.topic = topic;
    this.forceJSON = forceJSON;

    this.client = mqtt.connect('mqtt://' + this.host + ':' + this.port ? this.port : 1883);
    this.client.on('connect', function mqttConnected() {
        self.emit('connected');
    });

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

    debug('Sending %s to topic "%s"', JSON.stringify(this.payload), this.topic);
    return this.client.publish(this.topic, JSON.stringify(this.payload), {retain: true}, function() {
        debug('Acknowledged.');
    });

};
