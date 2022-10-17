'use strict';

/* Data Access Object (DAO) module for managing Managers */

const db = require("./db");

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

