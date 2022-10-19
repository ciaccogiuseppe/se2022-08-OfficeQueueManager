'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const cors = require('cors');
const { isLoggedIn } = require('./utils/utils');
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const managerDao = require('./dao/ManagerDAO'); // module for accessing the manager in the DB

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


/*** Set up Passport ***/
//set up the "username and password" login strategy
//by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    managerDao.getManager(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  managerDao.getManagerById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// then, init passport
app.use(passport.initialize());
app.use(passport.session());

///////////////*API*//////////////////
// declare routes
const serviceRoute = require('./routes/Service.js');
const counterRoute = require('./routes/Counter.js');
const jobRoute = require('./routes/Job.js');
const ticketRoute = require('./routes/Tickets.js');


//////*About the login and logout*////////
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        // this is coming from managerDao.getManager()
        return res.json(req.user);
      });
  })(req, res, next);
});

app.delete('/api/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

// apply routes
app.use('/api', ticketRoute);

app.use(isLoggedIn); //this will protect all the following API
app.use('/api', serviceRoute);
app.use('/api', counterRoute);
app.use('/api', jobRoute);

// Activate the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
module.exports = app;