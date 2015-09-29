var chirpArgs = require('commander');
var mqtt = require('mqtt');
var request = require('request');
var debug = require('debug')('chirp');

//var HttpClient = require('./clients/http');
var MqttClient = require('./clients/mqtt');

// Set up based on command line input
function rangeSplit(val) {
    return val.split(',');
}

chirpArgs
    .version(require('./package.json').version)
    .option('-h, --host [hostname]', 'Host to connect to' , 'localhost')
    .option('-p, --port [port]')
    .option('-P, --protocol [protocol]', 'Protocol to use (http|mqtt) (default: http)', 'http')
    .option('-t, --template [templateLocation]', 'Template to use (default: templates/default.js)', './templates/default.js')
    .option('-r, --rangeInterval <a>..<b>', 'Interval range in milliseconds', rangeSplit)
    .option('-T, --topic [topic]', '(MQTT only, the topic)')
    .parse(process.argv);

// Sanity checking
if(!chirpArgs.rangeInterval) {
    chirpArgs.rangeInterval = [1, 1000];
}

if(chirpArgs.protocol === 'mqtt' && !chirpArgs.topic) {
    console.error('You must set a topic if you are using the MQTT protocol.');
    process.exit(0);
}

var client = {};

switch(chirpArgs.protocol) {
    case 'http':
        client = new HttpClient(chirpArgs.host, chirpArgs.port, chirpArgs.topic);
        break;
    case 'mqtt':
        client = new MqttClient(chirpArgs.host, chirpArgs.port, chirpArgs.topic);
        break;
    default:
        console.error('Invalid protocol selection. Supported protocols are http or mqttt');
        process.exit(0);
        break;
}

// Include and check the template
var tpl = require(chirpArgs.template), templateInstance;
if(typeof tpl !== 'function') {
    console.error('Template not a function');
    process.exit(0);
}

// When the client is ready, we'll start our event loop
client.on('connected', function() {
    console.log('Connected');
    eventLoop();
});

function eventLoop() {

    function doRequest() {

        debug('Compiling template');
        client.setPayload(tpl().payload);

        debug('Sending request to ' + chirpArgs.protocol + ' server');
        client.send();

    }

    (function loop(client) {
        var rand = Math.round(Math.random() * (chirpArgs.rangeInterval[1] - chirpArgs.rangeInterval[0])) + chirpArgs.rangeInterval[0];
        setTimeout(function() {
            doRequest();
            loop();
        }, rand);
    }(client));

}
