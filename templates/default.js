module.exports = function() {

    var stockLevels = ['reorder', 'low', 'medium', 'full'];

    return {
        name: 'Random temperature readings',
        payload: {
            temperature: Math.min(Math.random() * 50),
            food: stockLevels[Math.floor(Math.random() * stockLevels.length)]
        }
    }
};