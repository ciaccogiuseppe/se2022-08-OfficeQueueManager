'use strict';

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const chaiHttp = require("chai-http");
const server = "http://localhost:3001/api/";

chai.use(chaiHttp);

describe("Service APIs", function () {

    let authenticatedUser = request.agent(server);
    let initialServices; // will be populated with all the services currently in the db
    const insertedService = {
        "name": "cool service",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in tortor lacus. Praesent cursus urna non lorem pellentesque, sed congue neque euismod.",
        "avarageTime": 145645
    };
    let serviceToDelete; // will be equal to the service inserted later, which has to be deleted

    step('T1 login', (done) => {
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

    step("T2 GET all services before tests", (done) => {
        authenticatedUser
            .get('services')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                const response = res.body;
                initialServices = response;
                console.log(initialServices);
                done();
            });
    });

    step("T3 insert service NOT authenticated", (done) => {
        chai
            .request(server)
            .post('service')
            .send({
                "name": "something",
                "description": "something",
                "avarageTime": 10
            })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("T4 insert service - wrong average time type", (done) => {
        authenticatedUser
            .post('service')
            .send({
                "name": "something",
                "description": "something",
                "avarageTime": "pippo"
            })
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T5 insert service - missing fields", (done) => {
        authenticatedUser
            .post('service')
            .send({
                "name": "nothing"
            })
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("T6 insert service authenticated", (done) => {
        authenticatedUser
            .post('service')
            .send(insertedService)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    step("T7 GET all services post insert", (done) => {
        authenticatedUser
            .get('services')
            .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body;
                responseBody.should.be.a('array');
                expect(responseBody[responseBody.length - 1]).that.includes(insertedService);
                expect(responseBody.length).to.be.above(initialServices.length);
                serviceToDelete = responseBody[responseBody.length - 1].idS;
                done();
            });
    });

    it("T8 delete service NOT authenticated", (done) => {
        chai
            .request(server)
            .delete('service/1')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("T9 delete service wrong id", (done) => {
        authenticatedUser
            .delete('service/pippo')
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("T10 delete service correctly", (done) => {
        authenticatedUser
            .delete(`service/${serviceToDelete}`)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });

    step("T11 GET all services post delete", (done) => {
        authenticatedUser
            .get('services')
            .end((err, res) => {
                res.should.have.status(200);
                const responseBody = res.body;
                expect(responseBody).to.deep.equal(initialServices);
                done();
            });
    });
});