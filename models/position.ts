import PositionService from '../services/position-service';

class Position {
  constructor(name, quote){
    this.setQuote(quote);
    this.setName(name);
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

  save(){
    PositionService.add(this);
  }

}
export default Position;