const Store = require('./store');
books = new Store();

class BookService {

  static create(subject, name,level){
    return new Book(subject, name, level);
  }

}

module.exports = BookService;
const Book = require('../models/book.js');
