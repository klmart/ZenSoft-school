import groups from './data/group-data';
import StudentGroupService from '../services/student-group-service';

class GroupBuilder{
    static fillGroups(){
        for (let group in groups){
            StudentGroupService.create(groups[group].level, groups[group].name).save();
        }
    }
}

export default GroupBuilder;