'use strict';

/* Data Access Object (DAO) module for managing Counters */

const db = require("./db");


/**
 * 
 * @param {integer} serviceId unique identifier of a must existing manager 
 * @returns {Promise<[count]>} an object presenting all fields of the Manager requested
 */
exports.getNumberActiveTicketsByServiceId = (serviceId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT COUNT(*) AS count FROM Ticket WHERE ID_Service = ? AND status = 'open'`;
        db.get(sql, [serviceId], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve(null); // manager not found
            else {
                const ticketCount = row.count;
                resolve(ticketCount);
            }
        });
    });
};