class Room {
    constructor(id, name) {
        this.numberOfBois = 0;
        this.id = id;
        this.name = name;
        this.players = [];
    }

    newBoi(player) {
        this.numberOfBois++;
        this.players.push(player);
    }

    boiLeft(player) {
        this.numberOfBois--;
        this.players.pop(player);
    }
}

module.exports = Room;