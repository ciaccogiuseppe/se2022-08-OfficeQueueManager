'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { isLoggedIn } = require('../utils/utils');
const serviceDao = require('../dao/ServiceDAO');

const router = express.Router();

// GET /api/services
// return all the services
router.get('/services', async (req,res) => {

    try {
        const services = await serviceDao.getServices();
        res.json(services);
    } catch(err) {
        res.status(500).json({errors: `Database error while retrieving services`}).end();
    }
});

// GET /api/service/:id  
// return the service by id
router.get('/service/:id', async (req,res) => {

    try {
        const service = await serviceDao.getServicesById(req.params.id);
        res.json(service);
    } catch(err) {
        res.status(500).json({errors: `Database error while retrieving the service`}).end();
    }
});

// POST /api/service
// define a new service
router.post('/service', isLoggedIn, [
    check('name').isLength({ min: 1}),
    check('description').isLength({ min: 1}),
    check('avarageTime').isInt()
  ], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
  
    const service = {
      name: req.body.name,
      description: req.body.description,
      avarageTime: req.body.avarageTime,
    }
  
    try{
      await serviceDao.addService(service, req.user.id);
      res.status(201).end();
    } catch(err) {
      res.status(503).json({error: `Database error during the definition of a service`});
    }
});
  
// DELETE /api/service
// delete a service given its id
router.delete('/service/:id', isLoggedIn, [
  check('id').isInt()
], async (req, res) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
  
    try {
      await serviceDao.deleteService(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the cancellation of the service.` });
    }
});

module.exports = router;