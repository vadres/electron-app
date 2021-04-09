const path = require('path')
const sqlite3 = require('sqlite3')
const sq = require('sqlite')
const macaddress = require('macaddress');

async function openDb () {
    const db = await sq.open({
      filename: path.join(__dirname, './database.db'),
      driver: sqlite3.Database
    })

    db.exec('CREATE TABLE IF NOT EXISTS config (id INT, description TEXT, value INT)');
    return db;
}

async function config(db) {
    const value = await db.get('SELECT value FROM config WHERE id = 1');
    !value && db.run(
        'INSERT INTO config (id, description, value) VALUES (1, "not first open app", 1)'
    );
    db.close();
    return !value;
}

async function saveConfig(db, ip, filial) {
    macaddress.one(function (err, mac) {
        db.run(
            'INSERT INTO config (id, description, value) VALUES (2, "Ipv4", ?)'
        , ip);

        db.run(
            'INSERT INTO config (id, description, value) VALUES (3, "Endereço mac", ?)'
        , mac);

        db.run(
            'INSERT INTO config (id, description, value) VALUES (4, "Filial", ?)'
        , filial);

        db.close();
    });
}


module.exports = {
    config: async () => {
        const db = await openDb();
        return await config(db);
    },
    saveConfig: async (ip, filial) => {
        const db = await openDb();
        return await saveConfig(db, ip, filial);
    }
}