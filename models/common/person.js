
class Person {
  constructor(user) {
    this.setName(user.name);
    this.setContacts(user.contacts);
    this.setDateOfBirth(user.dateOfBirth);
    this.setActive(false);
  }

  setName(name) {
    this.name = name;
  }

  getName(){
    return this.name;
  }

  setContacts(contacts){
    this.contacts = contacts;
  }
  getContacts(){
    return this.contacts;
  }

  setDateOfBirth(date){
    this.dateOfBirth = date;
  }

  getDateOfBirth(){
    return this.dateOfBirth;
  }

  // getAge(){
  //   // return Date.now - this.dateOfBrith;
  // }

  setActive(status){
    this.isActive = status;
  }

}

module.exports = Person;