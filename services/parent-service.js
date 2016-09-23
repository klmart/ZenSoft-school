const Store = require('./store');
const Service = require('./service');

parents = new Store();

class ParentService extends Service  {

  static getStore(){
    return parents;
  }

  static create(name, contacts){
    return new Parent(name, contacts);
  }

}


module.exports = ParentService;
const Parent = require('../models/parent');
