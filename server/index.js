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
const jobRoute = require('./routes/Job.js');

// apply routes
app.use('/api', counterRoute);
app.use('/api', jobRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));