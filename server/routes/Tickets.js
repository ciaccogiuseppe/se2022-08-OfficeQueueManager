
'use strict';

// import packages and classes
const express = require('express');
const { check, validationResult } = require('express-validator'); // validation middleware
const { errorFormatter, isLoggedIn } = require('../utils/utils');
const jobDao = require('../dao/JobDAO');
const serviceDao = require('../dao/ServiceDAO');
const ticketDao = require('../dao/TicketsDAO');
const { estimateTime, decTimeToDeg } = require('../utils/timeEstimation.js');


const router = express.Router();

/////////////////////////////////////////////////////////////////////
//////                          GET                            //////
/////////////////////////////////////////////////////////////////////

// /api/ticket/:serviceId
// Return estimated waiting time for a certain service id
router.get('/ticket/:serviceId', 
    check('serviceId').exists().isInt().toInt(), 
    
    async (req, res) => {
        const serviceId = req.params.serviceId;
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(500).json({ error: errors.array({}) });
    let nr = await ticketDao.getNumberActiveTicketsByServiceId(serviceId);
    let service = await serviceDao.getServicesById(serviceId);
    let tr = service[0] && service[0].avarageTime;
    let list = (await jobDao.getJobs()).
        reduce((a,b) => {
        let found = false;
        for (const ob of a){
          if (ob.ID_Counter == b.ID_Counter){
            ob.Serv_Counter++;
            if(b.ID_Service == serviceId){
                ob.Can_Serve = 1;
            }
            found = true;
            break;
          }
        }
        if (!found){
          a.push({ID_Counter:b.ID_Counter, Serv_Counter:1, Can_Serve:b.ID_Service == serviceId?1:0});
        }
        return a;
      }, []);
      let k_list = list.map(a=>a.Serv_Counter);
      let sr_list = list.map(a=>a.Can_Serve);
      let time = decTimeToDeg(estimateTime(tr, nr, k_list, sr_list));
      if(time != -1)
        res.status(200).json({"time":time});
      else
        res.status(500).json({ error: `Internal server error` });
});

/////////////////////////////////////////////////////////////////////
//////                          POST                           //////
/////////////////////////////////////////////////////////////////////

// /api/ticket
// Create a new ticket
router.post('/ticket',
    // isLoggedIn, WAIT FOR AUTHENTICATION
    async (req, res) => {
        // body validation
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(422).json({ error: errors.array({}) });

        // check whether ID Manager exists
        const serviceId = req.body.serviceID;
        try {
            const service = await serviceDao.getServicesById(serviceId);
            // case: manager not found
            if (!service[0]) {
                return res.status(404).json({ error: `Specified service not found` });
            }
            // case: manager found
            ticketDao.addTicket(serviceId)
                .then((ticketID) => res.status(201).json({ "ticketID": ticketID }))
                .catch(() => res.status(500).json({ error: `Database error while saving the service` }));
        } catch (error) {
            return res.status(500).json({ error: `Error while retrieving manager information` });
        }
    });

module.exports = router;