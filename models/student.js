const Person = require('./common/person');
const StudentService = require('../services/student-service')

class Student extends Person {
  constructor(user) {
    super(user);
    this.parents = [];
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

  save(){
    StudentService.add(this);
  }

}

module.exports = Student;
