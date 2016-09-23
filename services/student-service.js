const Store = require('./store');
const Service = require('./service');

students = new Store();

class StudentService extends Service {

    static getStore() {
        return students;
    }

    static create(name, contacts) {
        return new Student(name, contacts);
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

module.exports = StudentService;
const Student = require('../models/student');
