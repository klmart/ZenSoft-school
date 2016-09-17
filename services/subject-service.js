const Store = require('./store');

subjects = new Store();

class SubjectService{

  static create(name, level, hours, quote){
    return new Subject(name, level, hours, quote);
  }

  static getPayment(subject){
    return (+subject.quote) * (+subject.hours);
  }

}

module.exports = SubjectService;
const Subject = require('../models/subject');
