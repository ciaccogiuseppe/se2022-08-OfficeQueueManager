/* IMPORTS */
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);

function testPOSTTicket(expectedData, expectedHTTPStatus) {
    it('POST/api/ticket', async function() {
        await agent.post('/api/ticket')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}


function testGETTicketTime(serviceid,expectedData, expectedHTTPstatus){
    it('GET/api/ticket/:serviceId', async function() {
        await agent.get('/api/ticket/'+serviceid)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].time.should.equal(expectedData[i].time);
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                    });
    });
}

describe('test TicketAPI',()=>{


    /******* POST  *******/
    // Wrong body 
    testPOSTTicket({},422);
    testPOSTTicket({"WrongName":1},422);
    testPOSTTicket({"serviceID":"WrongValue"},422);

    // Service ID don't exists 
    testPOSTTicket({"serviceID":10},404);

    // OK : New Ticket issued
    testPOSTTicket({"serviceID":2},201);








});