import Store from './store';
import Service from './service';

const subjects = new Store();

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

export default SubjectService;
import Subject from '../models/subject';