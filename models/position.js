const PositionService = require('../services/position-service');

class Position {
  constructor(name, quote){
    this.setQuote(quote);
    this.setName(name);
  }

  save(){
    PositionService.add(this);
  }

  setQuote(quote){
    this.quote = quote;
  }

  getQuote(){
    return this.quote;
  }

  setName(name){
    this.name = name;
  }

  getName(){
    return this.name;
  }
}
module.exports = Position;