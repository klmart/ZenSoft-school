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
}

module.exports = Service;