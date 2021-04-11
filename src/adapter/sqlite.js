const path = require('path')
const sqlite3 = require('sqlite3').verbose()
var db

exports.db = db

const open = function() {
    const dir = process.env.DEV? 
                  path.join(__dirname, '../db/ascs12.dll'):
                  path.join(process.resourcesPath, 'ext/ascs12.dll');


    return new Promise(function(resolve) {
        this.db = new sqlite3.Database(dir, 
            function(err) {
                if(err) reject("Open error: "+ err.message)
                else    resolve(path + " opened")
            }
        )
        
        this.db?.exec('CREATE TABLE IF NOT EXISTS param (id INT, description TEXT, value INT)');
    })
}

// any query: insert/delete/update
exports.run=function(query, params) {
    open();

    return new Promise(function(resolve, reject) {
        this.db.run(query, params, 
            function(err)  {
                if(err) reject(err.message)
                else    resolve(true)
        })
    })    
}

// first row read
exports.get=function(query, params) {
    open(path.join(__dirname, '../db/database.db'));

    return new Promise(function(resolve, reject) {
        this.db.get(query, params, function(err, row)  {
            if(err) reject("Read error: " + err.message)
            else {
                resolve(row)
            }
        })
    }) 
}

exports.close=function() {
    return new Promise(function(resolve, reject) {
        this.db.close()
        resolve(true)
    }) 
}