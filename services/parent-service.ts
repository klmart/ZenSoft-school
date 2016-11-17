import Store from './store';
import Service from './service';
const parents = new Store();

class ParentService extends Service  {

  static getStore(){
    return parents;
  }

  static create(name, contacts){
    return new Parent(name, contacts);
  }

}


export default ParentService;
import Parent from '../models/parent';