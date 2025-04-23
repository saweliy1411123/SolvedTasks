class User {
    constructor(_name) {
        this.name = _name;
    }
}
const tom = new User("Том");
const header = this.document.getElementById("header");
header.innerHTML = "Привет " + tom.name;
