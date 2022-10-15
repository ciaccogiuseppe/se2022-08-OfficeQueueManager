'use strict'

const URL = 'http://localhost:3001/api';








//===========================================================================================
//          API for Service
//===========================================================================================

//post
//TODO

//get (one)
//TODO

//get all
async function getAllServices() {
    const response = await fetch(URL + '/services');   //we have to agree on the API names
    const services = await response.json();
    let err = new Error();
    if (response.ok) {
        return services;
    }
    else if (response.status === 500) {
        err.message = "500 INTERNAL SERVER ERROR"
        throw err;
    }
    else {
        err.message = "OTHER ERROR"
        throw err;
    }
}

//===========================================================================================
//          API for ticket
//===========================================================================================

//post
async function postTicket(ticket) {
    let err = new Error()
    const response = await fetch(URL + '/tickets', { //we have to agree on the API names
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket)
    })
    if (response.ok) {
        return response;
    }
    else if (response.status === 500) {
        err.message = "500 INTERNAL SERVER ERROR";
        throw err;
    }
    else if (response.status === 422) {
        err.message = "422 UNPROCESSABLE ENTITY";
        throw err;
    }
    else {
        err.message = "OTHER ERROR"
        throw err;
    }

}


