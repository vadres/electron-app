const path = require('path')
const sqlite3 = require('sqlite3')
const sq = require('sqlite')
const macaddress = require('macaddress');

const params = require('../config/params');

async function openDb () {
    const db = await sq.open({
      filename: path.join(__dirname, './database.db'),
      driver: sqlite3.Database
    })

    db.exec('CREATE TABLE IF NOT EXISTS config (id INT, description TEXT, value INT)');
    return db;
}

async function config(db) {
    const value = await db.get('SELECT value FROM config WHERE id = ?', params.NOT_FIRST_OPEN);
    !value && db.run(
        'INSERT INTO config (id, description, value) VALUES (1, "NOT_FIRST_OPEN", 1)'
    );
    db.close();
    return !value;
}

async function getParam(db, id) {
    const value = await db.get('SELECT value FROM config WHERE id = ?', id);
    db.close();
    return value;
}

async function saveConfig(db, ip, filial) {
    macaddress.one(function (err, mac) {
        db.run(
            'INSERT INTO config (id, description, value) VALUES (2, "IPV4", ?)'
        , ip);

        db.run(
            'INSERT INTO config (id, description, value) VALUES (3, "MAC", ?)'
        , mac);

        db.run(
            'INSERT INTO config (id, description, value) VALUES (4, "FILIAL", ?)'
        , filial);

        db.run(
            'INSERT INTO config (id, description, value) VALUES (5, "URL_REST", ?)'
        , 'http://fakerestapi.azurewebsites.net/api/v1/Activities');

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
    },
    getParam: async (id) => {
        const db = await openDb();
        return getParam(db, id);    
    }
}