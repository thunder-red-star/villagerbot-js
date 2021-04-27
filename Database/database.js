const fs = require("fs");
const db = require("./database.json")
function check_count(item, user) {
    return db.inventories[user][item]
}

class Database {
    constructor(location = "Database", name = "All.json") {
        if (location == "Database" && !fs.existsSync(`${__dirname}/Database`)) {
            fs.mkdirSync(`${__dirname}/Database`, { recursive: true });
        }
        else if (!fs.existsSync(`${location}`)) { fs.mkdirSync(`${__dirname}/${location}`, { recursive: true }); }
        let filePath = `${__dirname}/${location}/${name}.json`;
        if (!fs.existsSync(filePath))
            fs.closeSync(fs.openSync(filePath, 'w'));
        this.FilePath = filePath;
        this.Location = location;
    }
    async add(path, value) {
        let data = this.get(path);
        console.log(data + " -> " + typeof data)
        data += parseInt(value)
        await this.set(path, data);

    }
    async addItem(user, value, amount, path) {
        amount = parseInt(amount)
        value = value.replace(" ","")
        console.log("inventories."+user)
        console.log(this.get("inventories."+user))
        if (this.get("inventories." + user) == undefined) {
            let newPath = "inventories."+user
            return this.addUser(user, value, amount)
            console.log("Added user with id " + user)
        }
        console.log(this.get("inventories." + user))
        if (db.inventories[user].hasOwnProperty(value)) {
                return this.set(path, amount + check_count(value, user))
        } else {
    
        console.log("Gave item to " + user)
        return this.newKey(user, value, amount)
        }
    }
    get(path) {
        let data = this.read(), result = undefined;
        if (!data) data = {};
        result = _get(path, data);
        return result ? result : undefined;
    }
    set(path, value) {
        let data = this.read();
        if (!data) data = {};
        data = _set(path, value, data);
        let x = fs.openSync(`${__dirname}/database.json`, 'w')
        fs.truncateSync(this.FilePath);
        fs.writeFileSync(this.FilePath, JSON.stringify(data, null, 4), { encoding: "utf-8" });
        fs.closeSync(x)
        return data;
        console.log(data)
    }
    addUser(user, value, amount) {
        Object.keys(this.get("inventories")).forEach(function(k) {
            if (k == user) {
                return console.log("found user")
            }
        });
        let data = this.read();
        if (!data) data = {};
        data = _setUser(user, value, amount,data);
        let x = fs.openSync(`${__dirname}/database.json`, 'w')
        fs.truncateSync(this.FilePath);
        fs.writeFileSync(this.FilePath, JSON.stringify(data, null, 4), { encoding: "utf-8" });
        fs.closeSync(x)

        return data;
    }
    newKey(user, value, amount) {
        let data = this.read();
        if (!data) data = {};
        let x = fs.openSync(`${__dirname}/database.json`, 'w')
        data = _setKey(user, value, amount, data);
        fs.truncateSync(this.FilePath);
        fs.writeFileSync(this.FilePath, JSON.stringify(data, null, 4), { encoding: "utf-8" });
        fs.closeSync(x)

        return data;
    }
    sub(path, value) {
        let data = this.get(path);
        if (typeof data == "number") data -= Number(value);
        else data = Number(value);
        this.set(path, data);
        return data;
    }
    read() {
        let data = fs.readFileSync(this.FilePath, { encoding: "utf-8" });
        if (!data || (data && data == null)) return {};
        let obj = JSON.parse(data);
        return obj;
    }
}

function _set(path, value, obj = undefined) {
    if (obj == undefined) return undefined;
    let locations = path.split("."), output = {};
    output = obj;
    let ref = output;
    for (let index = 0; index < locations.length - 1; index++) {
        if (!ref[locations[index]])
            ref = ref[locations[index]] = {};
        else
            ref = ref[locations[index]];
    }
    ref[locations[locations.length - 1]] = value;
    return output;
}
function _setKey(user, value, amount, obj = undefined) {
    if (obj == undefined) return undefined;
    output = obj;
    let ref = obj;
    ref.inventories[user][value] = amount;
    output = ref;
    console.log(output)
    return output;
}
function _setUser(user, value, amount, obj = undefined) {
    if (obj == undefined) return undefined;
    output = obj;
    let ref = obj;
    ref.inventories[user] = {};
    delete ref.inventories[user][""]
    ref.inventories[user][value] = amount;
    output = ref;
    console.log(output)
    return output;
}

function _get(path, obj = {}) {
    let locations = path.split("."), ref = obj;
    for (let index = 0; index < locations.length - 1; index++) {
        ref = ref[locations[index]] ? ref[locations[index]] : undefined;
        if (!ref) return undefined;
    }
    let output = ref[locations[locations.length - 1]];
    return output;
}

module.exports = Database;