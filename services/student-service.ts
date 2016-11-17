import Store from './store';
import Service from './service';
import Student from '../models/student'

const students = new Store();

class StudentService extends Service {

    static getStore() {
        return students;
    }
//ToDO: refactor
    static create(student) {
        return new Student(student);
    }

    static findByName(name) {
        let callBack;
        students.forEach(function (student) {
            if (student.name === name) {
                callBack = student;
            }
        });
        return callBack;
    }
}

export default StudentService