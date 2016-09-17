const Store = require('./store');
positions = new Store();

class PositionService {

    static create(quote, name) {
        return new Position(quote, name);
    }

}
module.exports = PositionService;
const Position = require('../models/position');