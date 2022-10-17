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

/**
 * 
 * @param {integer} managerId unique identifier of a must existing manager 
 * @returns {Promise<[{ID_Manager, nameM, surnameM, email, password, salt}]>} an object presenting all fields of the Manager requested
 */
exports.getManagerById = (managerId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Manager WHERE ID_Manager = ?`;
        db.get(sql, [managerId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(null); // manager not found
            else {
                const manager = {
                    ID_Manager: row.ID_Manager, nameM: row.nameM, surnameM: row.surnameM, email: row.email, password: row.password, salt: row.salt
                };
                resolve(manager);
            }
        });
    });
};