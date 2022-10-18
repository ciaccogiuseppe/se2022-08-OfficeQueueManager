'use strict';

/* Data Access Object (DAO) module for managing Counters */

const db = require("./db");


/**
 * 
 * @param {integer} serviceId unique identifier of a must existing service 
 * @returns {Promise<[count]>} count of open tickets for a certain service
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


/**
 * 
 * @param {integer} serviceId unique identifier of a must existing service 
 * @returns {Promise<>} ticket ID
 */
exports.addTicket = (serviceId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Ticket (ID_Service) VALUES (?) RETURNING ID_Ticket`;
        db.run(sql, [serviceId], (err,row)=> {
            if (err)
                reject(err);
            else
            {
                const ticketId = row;
                resolve(ticketId);
            }
                
        });
    });
};