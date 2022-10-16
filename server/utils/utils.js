'use strict';

/**
 * 
 * @param {string} location place where the error occurred
 * @param {string} msg error message 
 * @param {string} param parameter presenting the error
 * @returns {string} returns an error message with a default pattern
 */
exports.errorFormatter = ({ location, msg, param }) => {
    return `${location}[${param}]: ${msg}`;
};

/**
 * checks whether a given request comes from an authenticated user
*/
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    return res.status(401).json({ error: 'Not logged in' });
}