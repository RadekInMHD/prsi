class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.admin = false;
    }

    makeAdmin() {
        this.admin = true;
    }
}

module.exports = Player;