const Store = require('./store');
const Service = require('./service');

subjects = new Store();

class SubjectService extends Service{

  static getStore(){
    return subjects;
  }

  static create(name, level, hours, quote){
    return new Subject(name, level, hours, quote);
  }

  static getPayment(subject){
    return (+subject.quote) * (+subject.hours);
  }

}

module.exports = SubjectService;
const Subject = require('../models/subject');
