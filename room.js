class Room {
    constructor(id, name) {
        this.numberOfBois = 0;
        this.id = id;
        this.name = name;
    }

    newBoi() {
        this.numberOfBois++;
    }

    boiLeft() {
        this.numberOfBois--;
    }
}

module.exports = Room;