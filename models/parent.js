const Person = require('./common/person');
const ParentService = require('../services/parent-service');

class Parent extends Person {
  constructor(name, contacts) {
    super(name, contacts);
      this.id;
  }

 save(){
   ParentService.add(this);
 }

}


module.exports = Parent;