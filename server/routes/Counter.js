'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { errorFormatter } = require("./utils/utils");

const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/counters
// Return an array containing all counters
router.get('/counters', (req, res) => {
    // TODO
});


/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// /api/counter
// Create a new counter
router.post('/counter', (req, res) => {
    // TODO
});

/////////////////////////////////////////////////////////////////////
//////                         DELETE                          //////
/////////////////////////////////////////////////////////////////////

// /api/counters/:id
// Delete an internal order, given its id.
router.delete('/counters/:id', (req, res) => {
    // TODO
});

module.exports = router;
