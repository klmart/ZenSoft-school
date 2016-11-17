import teachers from './data/teacher-data';
import TeacherService from '../services/teacher-service';

class TeacherBuilder {
    static fillTeachers(){
        for(let teacher in teachers){
            TeacherService.create(teachers[teacher]).save();
        }
    }
}

export default TeacherBuilder;