'use strict';

/* Data Access Object (DAO) module for managing Jobs */

const db = require("./db");

/**
 * 
 * @param {body,username} body contains counterId and serviceId; associated with username (managerid) allows to uniquely identify a Job
 * @returns {Promise<>} error object in case of error otherwise nothing
 */
exports.addJob = (counterId,serviceId,username) =>{
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Job (ID_Counter,ID_Service,ID_Manager) VALUES(?,?,?)';
        db.run(sql, [counterId, serviceId, username], (err) => {
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
        db.run(sql, [jobId, username], (err) => {
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
 * @returns {Promise<[{ID_Job,ID_Counter,ID_Service,ID_Manager}]>} array of job objects with the relative fields 
 */
 exports.getJobs = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Job`;
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                const jobs = rows.map((row => ({
                    ID_Job: row.ID_Job,
                    ID_Counter: row.ID_Counter, 
                    ID_Service: row.ID_Service,
                    ID_Manager: row.ID_Manager
                })));
                resolve(jobs);
            }
        });
    });
};