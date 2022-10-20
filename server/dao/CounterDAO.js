'use strict';

/* Data Access Object (DAO) module for managing Counters */

const db = require("./db");

/**
 * 
 * @returns {Promise<[{ID_Counter, ID_Manager}]>} array of counters objects with the relative fields 
 */
exports.getCounters = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Counter`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const counters = rows.map((row => ({
                    ID_Counter: row.ID_Counter, ID_Manager: row.ID_Manager
                })));
                resolve(counters);
            }
        });
    });
};

/**
 * 
 * @param {integer} managerId unique identifier of a must existing manager 
 * @returns {Promise<>} error object in case of error otherwise nothing
 */
exports.addCounter = (managerId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Counter(ID_Manager) VALUES (?)`;
        db.run(sql, [managerId], function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
};

/**
 * 
 * @param {integer} counterId unique identifier of a counter
 * @returns {Promise<>} error object in case of error otherwise nothing
 */
exports.deleteCounter = (counterId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM Counter WHERE ID_Counter = ?`;
        db.run(sql, [counterId], function (err) {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
};