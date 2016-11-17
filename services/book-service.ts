import Store from './store';
import Service from './service'

const books = new Store();

class BookService extends Service {

  static getStore(){
    return books;
  }

  static create(subject, name,level){
    return new Book(subject, name, level);
  }

}

export default BookService;

import Book from '../models/book';