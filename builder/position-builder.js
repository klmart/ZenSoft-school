const positions = require('./data/position-data');
const PositionService = require('../services/position-service');
class PositionBuilder{
    static fillPositions(){
        for (let position in positions){
            PositionService.create(positions[position].name, positions[position].quote).save();
        }
    }
}

module.exports = PositionBuilder;