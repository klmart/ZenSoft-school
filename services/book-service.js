const Store = require('./store');
const Service = require('./service');

books = new Store();

class BookService extends Service {

  static getStore(){
    return books;
  }

  static create(subject, name,level){
    return new Book(subject, name, level);
  }

}

module.exports = BookService;
const Book = require('../models/book.js');
