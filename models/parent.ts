import Person from './common/person';

import ParentService from '../services/parent-service';

class Parent extends Person {

  constructor(name, contacts) {
    super(name, contacts);
      this.id;
  }

 save(){
   ParentService.add(this);
 }

}


export default Parent;