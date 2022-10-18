
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

// /api/counters
// Return an array containing all counters
router.get('/ticket/:serviceId', 
    check('serviceId').exists().isInt().toInt(), 
    
    async (req, res) => {
        const serviceId = req.params.serviceId;
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty())
            return res.status(500).json({ error: errors.array({}) });
    let nr = await ticketDao.getNumberActiveTicketsByServiceId(serviceId);
    let service = await serviceDao.getServicesById(serviceId);
    let tr = await service[0].avarageTime;
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

      res.status(200).json({"time":decTimeToDeg(estimateTime(tr, nr, k_list, sr_list))})
});

module.exports = router;