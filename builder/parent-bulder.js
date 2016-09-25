const parents = require('./data/parent-data');
const ParentService = require('../services/parent-service');
class ParentBuilder {
    static fillParents(){
        for(let parent in parents){
           ParentService.create(parents[parent]).save();
        }
    }
}
module.exports = ParentBuilder;