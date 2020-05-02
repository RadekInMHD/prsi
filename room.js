class Room {
    constructor(id, name) {
        this.numberOfBois = 0;
        this.id = id;
        this.name = name;
        this.players = {};
    }

    newBoi(player) {
        this.numberOfBois++;
        this.players[player.id] = player;
    }

    boiLeft(player) {
        this.numberOfBois--;

        delete this.players[player.id];

        // this.players.splice(this.players.indexOf(player), 1);  // TODO: create Array.prototype.remove
    }
}

module.exports = Room;