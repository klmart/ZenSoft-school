class Service {
    static findAll() {
        return this.getStore().values();
    }

    getStore() {
        throw new Error('Must be implemented');
    }

    static add(value) {
        this.getStore().add(value);
    }

    static findBy(field, param){
        return this.getStore().findBy(field, param);
    }
}

module.exports = Service;