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

    removeById(id) {
        this.delete(id);
    }

    findById(id) {
        return this.get(id);
    }


}

module.exports = Store;

