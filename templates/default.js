module.exports = function() {
    return {
        name: 'Random temperature readings',
        payload: {
            temperature: Math.min(Math.random() * 50),
            apiKey: 'my-api-key'
        }
    }
};