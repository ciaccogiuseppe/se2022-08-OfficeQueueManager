'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { errorFormatter } = require('../utils/utils');
const jobDao = require('../dao/JobDAO');
const managerDao = require('../dao/ManagerDAO');
const counterDao = require('../dao/CounterDAO');
const serviceDao = require('../dao/ServiceDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                              POST                       //////
/////////////////////////////////////////////////////////////////////

router.post('/job',
    // isLoggedIn, WAIT FOR AUTHENTICATION
    check('ID_Counter').exists().isInt().toInt(),
    check('ID_Service').exists().isInt().toInt(),

    async (req, res) => {
        // body validation
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(422).json({ error: errors.array({}) });

        // check whether ID Manager, ID Counter and ID Service exists
        const managerId = req.user.id; //express required 
        const counterId = req.body.ID_Counter;
        const serviceId = req.body.ID_Service;
        try {
            const manager = await managerDao.getManagerById(managerId);
            // case: manager not found
            if (!manager) {
                return res.status(404).json({ error: `Manager not found` });
            }

            const counter = await counterDao.getCounters();
            // case: counter not found 
            if(!counter.find(element => element.ID_Counter==counterId)){
                return res.status(404).json({ error: `Counter not found` });
            }

            const service = await serviceDao.getServicesById(serviceId);
            // case: service not found
            if(!service){
                return res.status(404).json({ error: `Service not found` });
            }

            // case: manager,counter and service found
            jobDao.addJob(counterId,serviceId,managerId)
                .then(() => res.status(201).json({ message: `Job successfully created` }))
                .catch(() => res.status(500).json({ error: `Database error while saving the job` }));
        } catch (error) {
            return res.status(500).json({ error: `Error while retrieving information` });
        }
    });

/////////////////////////////////////////////////////////////////////
//////                         DELETE                          //////
/////////////////////////////////////////////////////////////////////

// /api/jobs/:id
// Delete a job, given its id
router.delete('/jobs/:id',
// isLoggedIn, WAIT FOR AUTHENTICATION
check('id').exists().isInt().toInt(),
async (req, res) => {
    // body validation
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array({}) });
        
    jobDao.deleteJob(req.params.id)
        .then(() => res.status(204).json({ message: `Job successfully deleted` }))
        .catch((e) => res.status(500).json({ error: `Database error while deleting the Job` }));
});

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/jobs
// Return an array containing all jobs
router.get('/jobs', (req, res) => {
    jobDao.getJobs()
        .then((jobs) => res.status(200).json(jobs))
        .catch(() => res.status(500).json({ error: `Database error while retrieving Jobs` }));
});


module.exports=router;