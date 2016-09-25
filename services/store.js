class Store extends Map {
    constructor() {
        super(...arguments);
        this.counter = 1;

    }

    getNextId() {
        return this.counter++;
    }

    fillId(value) {
        if (!value.id) {
            value.id = this.getNextId();
        }
        return value;
    }

    add(value) {
        value = this.fillId(value);
        this.set(value.id, value);
    }

    findById(id) {
        return this.get(id);
    }

    removeById(id) {
        this.delete(id);
    }

    findBy(field, param) {
        let callBack;
        this.forEach(function(elem){
            if(elem[field] === param) {
                callBack = elem;
            }
        });
        return callBack;
    }

}

module.exports = Store;

