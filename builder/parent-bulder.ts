import parents from './data/parent-data';
import ParentService from '../services/parent-service';

class ParentBuilder {
    static fillParents(){
        for(let parent in parents){
           ParentService.create(parents[parent]).save();
        }
    }
}

export default ParentBuilder;