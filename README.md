# Chirp

This project was borne out of my need to send arbitrary data at random intervals to servers that speak MQTT and HTTP
to test an IoT system.

chirp is presented as a command line program. Install as follows:

    npm install -g chirp-generator
    
## Usage
    
      Usage: chirp-generator [options]
    
      Options:
    
        -h, --help                         output usage information
        -V, --version                      output the version number
        -h, --host [hostname]              Host to connect to
        -p, --port [port]                  
        -P, --protocol [protocol]          Protocol to use (http|mqtt) (default: http)
        -u --url [url]                     Required for HTTP only. The URL to send the data to.
        -t, --template [templateLocation]  Template to use (default: ./templates/default.js)
        -r, --rangeInterval <a>..<b>       Interval range in milliseconds
        -T, --topic [topic]                (MQTT only, the topic)
        -m, --method [method]              (HTTP only, the method. Default is PUT)
        -v, --verbose                      Show verbose output
    
## Templates     

Templates are used to mock the data you're sending to the server. They are interpreted as Javascript on each request
so you can randomise or otherwise change the data on each run. See the included `templates/default.js` file for an example:

    module.exports = function() {
        return {
            name: 'Random temperature readings',
            payload: {
                temperature: Math.min(Math.random() * 50),
                apiKey: 'my-api-key'
            }
        }
    };
    
For a template to be valid, it should export a *function* that contains a `name` and `payload` function. Payload will be
delivered to the server either via MQTT or HTTP as desired. 
