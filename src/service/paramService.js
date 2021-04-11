const sqlite = require('../adapter/sqlite')
const macaddress = require('macaddress');

const params = require('../config/params');

async function hasConfig() {
    const value = await sqlite.get('SELECT value FROM param WHERE id = ?', params.NOT_FIRST_OPEN);
    
    sqlite.close();
    return !value;
}

async function getParam(id) {
    const value = await sqlite.get('SELECT value FROM param WHERE id = ?', id);
    
    sqlite.close();
    return value;
}

async function saveConfig(ip, filial) {
    macaddress.one(function (err, mac) {
        if (!err) {
            sqlite.run(
                'INSERT INTO param (id, description, value) VALUES (1, "NOT_FIRST_OPEN", 1)'
            );
            sqlite.run(
                'INSERT INTO param (id, description, value) VALUES (2, "IPV4", ?)'
            , [ip]);

            sqlite.run(
                'INSERT INTO param (id, description, value) VALUES (3, "MAC", ?)'
            , [mac]);

            sqlite.run(
                'INSERT INTO param (id, description, value) VALUES (4, "FILIAL", ?)'
            , [filial]);

            sqlite.run(
                'INSERT INTO param (id, description, value) VALUES (5, "URL_REST", ?)'
            , 'http://fakerestapi.azurewebsites.net/api/v1/Activities');

            sqlite.close();
        }
    });
}


module.exports = {
    hasConfig,
    saveConfig,
    getParam
}