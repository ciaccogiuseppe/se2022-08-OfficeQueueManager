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

// declare routes
const counterRoute = require('./routes/Counter.js');

// apply routes
app.use('/api', counterRoute);

// POST /api/job
/* Creates a new Job, given the body and the logged Manager */
app.post('/api/job', async (req, res) => {
  try {
        // Body contains counterid and serviceid
        // req.user.id contains the userid
    await dao.addJob(req.body, req.user.id);
    return res.status(201).end();
  } catch (err) {
    console.log(err);
    return res.status(503).json({ error: err });
  }
});

// DELETE /api/job
/** Deletes the Job given the serviceid and userid specified */
app.delete('/api/job', async (req, res) => {
  try {
      await dao.deleteJob(req.body, req.user.id);
      return res.status(204).end();
  } catch (err) {
      return res.status(503).json({ error: err });
  }
});



// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));