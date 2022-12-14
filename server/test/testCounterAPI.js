/* IMPORTS */
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const app = require('../index.js');
let agent = chai.request.agent(app);
const request = require('supertest');
const server = "http://localhost:3001";

/* Calls api/counters and verifies if returned data are equals to expectedData 
   and if the returnet status (200,400,...) is equal to expectedHTTPStatus */
function testGETCounters(expectedData, expectedHTTPstatus){
    let authenticatedUser = request.agent(server);
    step('T1 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "mariorossi@po.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('GET/api/counters', async function() {
        await authenticatedUser.get('/api/counters')
                    .then(function(res) {
                        res.should.have.status(expectedHTTPstatus);
                        if(expectedData.length != 0){
                            for (let i = 0; i < expectedData.length; i++) {
                                res.body[i].ID_Counter.should.equal(expectedData[i].ID_Counter);
                                res.body[i].ID_Manager.should.equal(expectedData[i].ID_Manager);
                            }
                        } else {
                            res.body.length.should.equal(expectedData.length);
                        }
                    });
    });
}

function testDELETECounter(id,expectedHTTPStatus) {
    let authenticatedUser = request.agent(server);
    step('T1 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "mariorossi@po.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('DELETE/api/counters/:id', async function() {
        await authenticatedUser.delete('/api/counters/'+id)
                    .then(function(res) {
                        res.should.have.status(expectedHTTPStatus);
                    })
    });
}

function testPOSTCounter(expectedData, expectedHTTPStatus) {
    let authenticatedUser = request.agent(server);
    step('T1 login', (done) => {
        authenticatedUser
            .post('/api/sessions')
            .send({
                "username": "mariorossi@po.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('POST/api/counter', async function() {
        await authenticatedUser.post('/api/counter')
            .send(expectedData)
            .then(function(res) {
                res.should.have.status(expectedHTTPStatus);
            });
    });
}

describe('test CounterAPI',()=>{

    /****** POST ******/
    // Wrong body, validation errors
    //testPOSTCounter({"ID_Manager": "Antonello"},422);
    //testPOSTCounter({"Manager_ID": 1},422);

    // Missing manager 
    //testPOSTCounter({"ID_Manager": 5},404);

    // OK: Counter created successfully
    testPOSTCounter({"ID_Manager": 1},201);

    /****** GET ******/

    // OK: Get the counter created before 
    testGETCounters({"ID_Counter":1, "ID_Manager":1},200);

    /****** DELETE ******/
    //Wrong param, validation error
    testDELETECounter("Antonello",422);

    // OK: Delete the counter created before
    testDELETECounter(1,204);

})