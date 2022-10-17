'use strict';

/* Data Access Object (DAO) module for managing Jobs */

const db = require("./db");

/**
 * 
 * @param {body,username} body contains counterid and serviceid; associated with username (managerid) allows to uniquely identify a Job
 * @returns {Promise<>} error object in case of error otherwise nothing
 */
exports.addJob = (body,username) =>{
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Job (ID_Counter,ID_Service,ID_Manager) VALUES(?,?,?)';
        db.run(sql, [body.counterid, body.serviceid, username], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * 
 * @param {jobid,username} jobid associated with username (managerid) allows to uniquely identify a Job
 * @returns {Promise<>} error object in case of error otherwise nothing
 */
exports.removeJob = (jobid, username)=>{
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Job WHERE ID_Job = ? AND ID_Manager = ?';
        db.run(sql, [jobid, username], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}