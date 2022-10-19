'use strict';

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = "http://localhost:3001/api/";

chai.use(chaiHttp);

describe("Job APIs", function () {

    let authenticatedUser = request.agent(server);

    step('login', (done) => {
        authenticatedUser
            .post('sessions')
            .send({
                "username": "mariorossi@po.it",
                "password": "password"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("insert job authenticated", (done) => {
        authenticatedUser
            .post('job')
            .send({
                "ID_Counter": 2,
                "ID_Service": 2
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("Error: invalid value during the insert ", (done) => {
        authenticatedUser
            .post('job')
            .send({
                "ID_Counter": "something",
                "ID_Service": 1
            })
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("GET all jobs", (done) => {
        authenticatedUser
            .get('jobs')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                const response = res.body;
                console.log(response);
                done();
            });
    });

    step("DELETE a job with a specific id", (done) => {
        authenticatedUser
            .delete('jobs/2')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    step("Error: invalid value of the id during DELETE", (done) => {
        authenticatedUser
            .delete('jobs/something')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("GET all jobs", (done) => {
        authenticatedUser
            .get('jobs')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                const response = res.body;
                console.log(response);
                done();
            });
    });
});