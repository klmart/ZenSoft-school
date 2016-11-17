import Store from './store';
import Service from './service';

const positions = new Store();

class PositionService extends Service {
    static getStore() {
        return positions
    }

    static create(quote, name) {
        return new Position(quote, name);
    }


}

export default PositionService;
import Position from '../models/position';