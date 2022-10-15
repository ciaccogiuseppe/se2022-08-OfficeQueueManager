'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

/* Create new db instance */
const db = new sqlite.Database('db.sqlite', (err) => {
    if (err) {
        throw err;
    }
});

/*  Creates a new JOB inside the database  */
function addJob(body, username) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Job (ID_Counter,ID_Service,ID_Manager) VALUES(?,?,?)';
        db.run(sql, [body.counterid, body.serviceid, username], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteJob(body, username) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Job WHERE ID_Counter = ? AND ID_Service= ? AND ID_Manager = ?';
        db.run(sql, [body.counterid, body.serviceid, username], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {addJob,deleteJob}