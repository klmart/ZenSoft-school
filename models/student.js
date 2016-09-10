const Person = require('./common/person');
const Parent = require ('./parent');
const StudentService = require('../services/student-service')

class Student extends Person {
  constructor(user) {
    super(user);
    this.parents = [];
  }

  save(){
    StudentService.add(this);
  }

  setParents(parents){
    this.parents = parents;
  }
  getParents(){
    return this.parents;
  }

  addParent(parent){
    this.parents.push(parent);
  }
}

module.exports = Student;