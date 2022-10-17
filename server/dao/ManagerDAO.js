'use strict';
/* Data Access Object (DAO) module for accessing users */

const crypto = require('crypto');

// open the database
const db = require('./db');

exports.getManager = (email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Manager WHERE email = ?';
        db.get(sql, [email], (err, row) => {
            if (err) { reject(err); }
            else if (row === undefined) { resolve(false); }
            else {
                const user = {id: row.ID_Manager, username: row.email, nameM: row.nameM, surnameM: row.surnameM};
                
                const salt = row.salt;
                crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);

                    const passwordHex = Buffer.from(row.password, 'hex');

                    if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
                    resolve(false);
                    else resolve(user); 
                });
            }
        });
    });
};

exports.getManagerById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Manager WHERE ID_Manager = ?';
            db.get(sql, [id], (err, row) => {
            if (err) 
                reject(err);
            else if (row === undefined)
                resolve({error: 'User not found.'});
            else {
                // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
                const user = {id: row.ID_Manager, username: row.email, nameM: row.nameM, surnameM: row.surnameM}
                resolve(user);
            }
        });
    });
};