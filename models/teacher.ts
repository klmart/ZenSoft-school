import Person from './common/person';

import TeacherService from '../services/teacher-service';

class Teacher extends Person {
  constructor(name,contacts) {
    super(name, contacts);
    this.positions = [];
    this.subjects = [];
  }

  setSubjects(subjects){
    this.subjects = subjects;
  }

  getSubjects(){
    return this.subjects;
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  setPositions(positions){
    this.positions = positions;
  }

  addPosition(position){
    this.positions.push(position)
  }

  getPositions(){
    return this.positions;
  }

  save(){
    TeacherService.add(this);
  }


}

export default Teacher;