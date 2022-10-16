'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors');

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
  
  const service = {
    description: req.body.description,
    avarage_time: req.body.avarage_time,
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
  try {
    await dao.deleteService(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) {
    res.status(503).json({ error: `Database error during the cancellation of the service.` });
  }
});

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));