import students from './data/student-data';
import StudentService from '../services/student-service';

class StudentBuilder {
    static fillStudents(){
        for(let student in students){
            StudentService.create(students[student]).save();
        }
    }
}

export default StudentBuilder;