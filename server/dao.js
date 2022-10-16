'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('OfficeQueueManagement.sqlite', (err) => {
    if(err) throw err;
});

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
                    description: s.description,
                    avarageTime: s.avarageTime,
                    idM: s.ID_Manager,
                }
            ));
            resolve(services);
        });
    });
};

exports.addService = (service, managerId) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Service(description,ID_Manager, avarageTime) VALUES(?, ?, ?)';
        db.run(sql, [service.description, managerId, service.avarageTime], function (err) { 
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