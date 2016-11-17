import SubjectService from '../services/subject-service';

class Subject {
  constructor(name, level, hours, quote) {
    this.setName(name);
    this.setLevel(level);
    this.setHours(hours);
    this.setQuote(quote);
    this.books = [];
  }

  addBook(book){
    this.books.push(book);
  }

  setName(name){
    this.name = name
  }

  getName(){
    return this.name;
  }

  setLevel(level){
    this.level = level;
  }

  getLevel(){
    return this.level;
  }

  setHours(hours){
    this.hours = hours;
  }

  getHours(){
    return this.hours;
  }

  setQuote(quote){
    this.quote = quote;
  }

  getQuote(){
    return this.quote;
  }

  addBook(book){
    this.books.push(book);
  }

  getBooks(){
    return this.books;
  }

  save(){
    SubjectService.add(this);
  }


}

export default Subject;