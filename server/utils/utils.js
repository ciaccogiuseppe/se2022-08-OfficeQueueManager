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