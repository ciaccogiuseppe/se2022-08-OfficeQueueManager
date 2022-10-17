'use strict';

// custom middleware: check if a given request is coming from an authenticated user
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
      return next();
    
    return res.status(401).json({ error: 'not authenticated'});
  }