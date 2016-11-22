// Надо удалить если будет все работать
// const Student = require('./student');
// const Teacher = require('./teacher');
// const TeachersRole = require('./teachers-role');

import StudentGroupService from '../services/student-group-service';

class StudentGroup {
    constructor(level, name) {
        this.setLevel(level);
        this.setGroupNumber(name);
        this.students = [];
        this.teachersRole = [];
        this.isActive = false;
    }

    isActive(status) {
        this.isActive = status;
    }

    setLevel(level) {
        this.level = level;
    }

    getLevel() {
        return this.level;
    }

    setGroupNumber(number) {
        this.groupNumber = number;
    }

    getGroupNumber() {
        return this.groupNumber;
    }

    getStudents() {
        return this.students;
    }

    groupName() {
        return `${this.level} ${this.groupNumber}`;
    }

    remove(){
        StudentGroupService.removeById(this.id)
    }


    save(){
        StudentGroupService.add(this);
    }

}


export default StudentGroup;