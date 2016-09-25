const groups = require('./data/group-data');
const StudentGroupService = require('../services/student-group-service');

class GroupBuilder{
    static fillGroups(){
        for (let group in groups){
            StudentGroupService.create(groups[group].level, groups[group].name).save();
        }
    }
}
module.exports = GroupBuilder;