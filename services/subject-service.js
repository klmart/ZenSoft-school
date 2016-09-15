const subjects = [];

class SubjectService{
  constructor(){}

  static create(name, level, hours, quote){
    return new Subject(name, level, hours, quote);
  }

  static addSubject(subject){
    subjects.push(subject);
  }

  static findAll(){
    return subjects;
  }

  static findBy(field, param){
    return subjects.filter(function (subject) {
      return subject[field] === param;
    })
  }

  static removeByName(name){
    let obj =  subjects.find(function (subject) {
      return subject.name === name;
    });

    let i = subjects.indexOf(obj);
    if(i != -1) subjects.splice(i, 1);
  }

  static getPayment(subject){
    return (+subject.quote) * (+subject.hours);
  }

}

module.exports = SubjectService;
const Subject = require('../models/subject');
