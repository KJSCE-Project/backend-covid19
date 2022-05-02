let chai = require('chai')
let chaiHTTP = require('chai-http')
let apiRoute = require('../routes/api-v1');
let loginRoute = require('../routes/api-v1');

chai.should();

chai.use(chaiHTTP);

describe('API v1 Tests', ()=>{
    // Test to Get departments
    it('POST /getDepartments', (done)=>{
        chai.request(apiRoute)
            .post('/getDepartments')
            .end((err, response)=>{
                response.should.have.status(200);
                response.should.not.be.null;
                done();
            })
    })
    // Test to get Employees number
    it('POST /getEmpNumber', (done)=>{
        chai.request(apiRoute)
            .post('/getDepartments')
            .end((err, response)=>{
                response.should.have.status(200);
                response.should.not.be.null;
                done();
            })
    })
    // Test to get Total Employees
    it('POST /getEmployees', (done)=>{
        chai.request(apiRoute)
            .post('/getEmployees')
            .end((err, response)=>{
                response.should.have.status(200);
                response.should.not.be.null;
                done();
            })
    })
})