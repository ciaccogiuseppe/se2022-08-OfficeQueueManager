'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors');
const {check, validationResult} = require('express-validator');
const dao = require('./dao');

// init express
const app = new express(); // FIXME: should we use new?
const PORT = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// GET /api/services
// return all the services
app.get('/api/services', async (req,res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
      const services = await dao.getServices();
      res.json(services);
  } catch(err) {
      res.status(500).json({errors: `Database error while retrieving services`}).end();
  }
});

// POST /api/service
// define a new service
app.post('/api/service', [
  check('description'.isLenghth({ min: 1}))
], async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const service = {
    description: req.body.description,
    avarageTime: req.body.avarageTime,
  }

  try{
    await dao.addService(service, req.user.id);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Database error during the definition of a service`});
  }
});

// DELETE /api/service
// delete a service given its id
app.delete('/api/service/:id', async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  try {
    await dao.deleteService(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the cancellation of the service.` });
  }
});

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));