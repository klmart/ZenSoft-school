import positions from './data/position-data';
import PositionService from '../services/position-service';
class PositionBuilder{
    static fillPositions(){
        for (let position in positions){
            PositionService.create(positions[position].name, positions[position].quote).save();
        }
    }
}

export default PositionBuilder;