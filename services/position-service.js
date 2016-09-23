const Store = require('./store');
const Service = require('./service');

positions = new Store();

class PositionService extends Service {
    static getStore() {
        return positions
    }

    static create(quote, name) {
        return new Position(quote, name);
    }


}
module.exports = PositionService;
const Position = require('../models/position');