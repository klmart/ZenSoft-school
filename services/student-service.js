const Store = require('./store');
students = new Store();

class StudentService {

  static create(name, contacts){
    return new Student(name, contacts);
  }

  static findByName(name){
    let callBack;
    students.forEach(function (student) {
      if (student.name === name){
        callBack = student;
      }
    });
    return callBack;
  }

}

module.exports = StudentService;
const Student = require('../models/student');
