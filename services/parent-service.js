const Store = require('./store');
parents = new Store();

class ParentService {

  static create(name, contacts){
    return new Parent(name, contacts);
  }

  // static findBy(field, param){
  //   return parents.filter(function (parent) {
  //     return parent[field] === param;
  //   })
  // }

  // static removeByName(name){
  //   let obj =  parents.find(function (parent) {
  //     return parent.name === name;
  //   });
  //
  //   let i = parents.indexOf(obj);
  //   if(i != -1) parents.splice(i, 1);
  // }

}


module.exports = ParentService;
const Parent = require('../models/parent');
