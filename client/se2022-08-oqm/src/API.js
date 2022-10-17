'use strict'

import { Service, ServiceList } from "./utils/serviceList";
import { Counter, CounterList } from "./utils/counterList";

const URL = 'http://localhost:3001/api';

//===========================================================================================
//          AUTHENTICATION API
//===========================================================================================
const logIn = async (credentials) => {
    const url = URL + '/sessions'; // TO DO: Check server URL
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user; //user's info
    }
    else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const logOut = async () => {
    // TO DO: Check server URL
    const response = await fetch(URL + '/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}



//===========================================================================================
//          API for Service
//===========================================================================================

//post
async function postService(service) {
    const url = URL+''; //TO DO: URl
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(service),
            credentials: 'include',
        });
        if (response.ok) {
            return response;
        } else {
            /* Application errors (500,422,...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//get
async function getService(serviceid) {
    const url = URL + '/services/' + serviceid; // TO DO: Check server URL

    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        /* Fetch request accepted */
        if (response.ok) {
            const jsonservice = await response.json();
            return jsonservice;
            // TO DO: Map as a Service js object?

        } else {
            /* Application error (404, 500, 503 ...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//get all
async function getAllServices() {
    const response = await fetch(URL + '/services');   //we have to agree on the API names
    let err = new Error();
    if (response.ok) {
        const services = await response.json();
        const serviceList = new ServiceList();

        services.forEach(s => {
            serviceList.addNewService(new Service(s.ID_Service,s.description,s.ID_Manager, s.averagetime));
        });
        return serviceList;
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

//delete
async function deleteService(serviceid) {
    const url = URL + `/service/${serviceid}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            return true;
        } else {
            /* Application error (404, 500, 503 ...) */
            const text = await response.text();
            throw new TypeError(text);
        }
        
    } catch (err) {
        /* Network error */
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

//===========================================================================================
//          API for COUNTER 
//===========================================================================================

//post
async function postCounter() {
    const url = URL+'/counter'; 
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
        });
        if (response.ok) {
            return response;
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//delete
async function deleteCounter(counterid) {
    const url = URL + `/counters/${counterid}`;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            return true;
        } else {
            /* Application error (404, 500, 503 ...) */
            const text = await response.text();
            throw new TypeError(text);
        }
        
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//get 
// Returns a CounterList containing an array of Counters
async function getCounters() {
    const url = URL + '/counters';

    try {
        const response = await fetch(url, {
            credentials: 'include',
        });
        /* Fetch request accepted */
        if (response.ok) {
            const jsoncounters = await response.json();
            const counterlist = new CounterList();
            
            jsoncounters.forEach((c)=>{
                counterlist.addNewCounter(addNewCounter(c.ID_Counter,c.ID_Manager))
            })
            return counterlist;

        } else {
            /* Application error (404, 500, 503 ...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//===========================================================================================
//          API for JOB 
//===========================================================================================


/*
post 
Assign a Service to a Counter (post JOB)
*/
async function assignServicetoCounter(counterid,serviceid) {
    const url = URL+'/job';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ID_Counter':counterid,
                                  'ID_Service':serviceid}),
            credentials: 'include', 
        });
        if (response.ok) {
            return response;
        } else {
            /* Application errors (500,422,...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}

//delete REMOVE A SERVICE FROM A COUNTER (delete JOB)
async function deleteServicefromCounter(jobid) {
    const url = URL+`/jobs/${jobid}`; 
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
        });
        if (response.ok) {
            return response;
        } else {
            /* Application errors (500,422,...) */
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        /* Network error */
        throw err;
    }
}


const API = {getCounters,deleteCounter,deleteService,deleteServicefromCounter,assignServicetoCounter, postCounter,postTicket,getAllServices,logOut,logIn,postService,getService};
export default API;