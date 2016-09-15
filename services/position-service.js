const positions = [];

class PositionService{
  constructor(){}
  static create(quote, name){
    return new Position(quote, name);
  }

  static findAll(){
    let array = [];
    return array.concat(positions);
  }

  static add(position){
    positions.push(position);
  }

  static findBy(field, param){
    return positions.filter(function (position) {
      return position[field] === param;
    })
  }


  static removeByName(name){
    let obj =  positions.find(function (position) {
      return position.name === name;
    });

    let i = books.indexOf(obj);
    if(i != -1) books.splice(i, 1);
  }

}
module.exports = PositionService;
const Position = require('../models/position');
