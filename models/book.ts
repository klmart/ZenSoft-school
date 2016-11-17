import BookService from '../services/book-service';

class Book {

  constructor(subject, name, level){
    this.setSubject(subject);
    this.setName(name);
    this.setLevel(level);
  }

  setSubject(subject){
    this.subject = subject;
  }

  getSubject(){
    return this.subject;
  }

  setName(name){
    this.name = name;
  }

  getName(){
    return this.name;
  }

  setLevel(level){
    this.level = level;
  }

  getLevel(){
    return  this.level;
  }

  save(){
    BookService.add(this);
  }


}
export default Book;