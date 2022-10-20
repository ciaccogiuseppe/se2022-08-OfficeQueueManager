'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { errorFormatter, isLoggedIn } = require('../utils/utils');
const counterDao = require('../dao/CounterDAO');
const managerDao = require('../dao/ManagerDAO');

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/counters
// Return an array containing all counters
router.get('/counters', (req, res) => {
    counterDao.getCounters()
        .then((counters) => res.status(200).json(counters))
        .catch(() => res.status(500).json({ error: `Database error while retrieving the counters` }));
});

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// /api/counter
// Create a new counter
router.post('/counter',
    // isLoggedIn, WAIT FOR AUTHENTICATION
    //check('ID_Manager').exists().isInt().toInt(),
    async (req, res) => {
        /*
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(422).json({ error: errors.array({}) });
        */
        // check whether ID Manager exists
        const managerId = req.user.id;
        try {
            const manager = await managerDao.getManagerById(managerId);
            // case: manager not found
            if (!manager) {
                return res.status(404).json({ error: `Specified manager not found` });
            }
            // case: manager found
            counterDao.addCounter(managerId)
                .then(() => res.status(201).json({ message: `Counter successfully created` }))
                .catch(() => res.status(500).json({ error: `Database error while saving the counter` }));
        } catch (error) {
            return res.status(500).json({ error: `Error while retrieving manager information` });
        }
    });

/////////////////////////////////////////////////////////////////////
//////                         DELETE                          //////
/////////////////////////////////////////////////////////////////////

// /api/counters/:id
// Delete a counter, given its id
router.delete('/counters/:id',
    // isLoggedIn, WAIT FOR AUTHENTICATION
    check('id').exists().isInt().toInt(),
    async (req, res) => {
        // body validation
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(422).json({ error: errors.array({}) });

        counterDao.deleteCounter(req.params.id)
            .then(() => res.status(204).json({ message: `Counter successfully deleted` }))
            .catch(() => res.status(500).json({ error: `Database error while deleting the counter` }));
    });

module.exports = router;
