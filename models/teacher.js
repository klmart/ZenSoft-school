const Person = require('./common/person');
// const Subject = require('./subject');
// const Position = require('./position');
const TeacherService = require('../services/teacher-service');

class Teacher extends Person {
  constructor(name,contacts) {
    super(name, contacts);
    this.positions = [];
    this.subjects = [];
    // this.setSubjects(subjects);
    // this.setPositions(positions);
  }

  save(){
    TeacherService.add(this);
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

}

module.exports = Teacher;
