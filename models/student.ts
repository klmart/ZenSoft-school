import Person from './common/person';

import StudentService from '../services/student-service';

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

  remove(){
    StudentService.removeById(this.id)
  }

  save(){
    StudentService.add(this);
  }

}

export default Student;