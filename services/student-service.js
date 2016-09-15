const students = [];

class StudentService {
  constructor(){}
  static create(name, contacts){
    return new Student(name, contacts);
  }

  static add(student){
    students.push(student);
  }

  static findAll(){
    let array = [];
    return array.concat(students);
  }

  static findByName(name){
    return students.filter(function (student) {
      return student.name === name;
    })
  }

  static findBy(field, param){
    return students.filter(function (student) {
      return student[field] === param;
    })
  }

  static removeByName(name){
    let obj =  students.find(function (student) {
      return student.name === name;
    });
    let i = students.indexOf(obj);
    if(i != -1) students.splice(i, 1);
  }

}

module.exports = StudentService;
const Student = require('../models/student');
