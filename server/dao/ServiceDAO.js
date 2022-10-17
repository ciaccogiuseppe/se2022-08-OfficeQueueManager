'use strict';

const db = require('./db');

exports.getServices = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Service';
        db.all(sql, (err, rows) => {
            if(err) {
                reject(err);
                return;
            }

            const services = rows.map((s) => (
                {
                    idS: s.ID_Service,
                    name: s.name,
                    description: s.description,
                    avarageTime: s.avarageTime,
                    idM: s.ID_Manager,
                }
            ));
            resolve(services);
        });
    });
};

exports.getServicesById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Service WHERE ID_Service=?';
        db.all(sql, [id], (err, rows) => {
            if(err) {
                reject(err);
                return;
            }

            const service = rows.map((s) => (
                {
                    idS: s.ID_Service,
                    name: s.name,
                    description: s.description,
                    avarageTime: s.avarageTime,
                    idM: s.ID_Manager,
                }
            ));
            resolve(service);
        });
    });
};

exports.addService = (service, managerId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Service(description, ID_Manager, avarageTime, name) VALUES(?, ?, ?, ?)';
        db.run(sql, [service.description, managerId, service.avarageTime, service.name], function (err) { 
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

exports.deleteService = (id) => {
	return new Promise((resolve,reject) => {
		const sql = 'DELETE FROM Service WHERE ID_Service=?';
		db.run(sql, [id], (err) => {
			if(err){
				reject(err);
				return;
			}
			resolve();
		});
	});
};