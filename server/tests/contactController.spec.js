var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var assert = chai.assert;

chai.use(chaiHttp);
let should = chai.should();

describe('Contact API Tests', function () {

    var contact = {
        firstName: 'Kufre',
        lastName: 'Okon',
        emailAddress: 'kufreokon24@gmail.com',
        mobilePhone: '07065657658',
        jobTitle: 'Software Developer',
        address: '#23 Nwaniba Road',
        city: 'Uyo',
        state: 'Akwa Ibom',
        notes: 'This is just a test',
    };

    it('should be able to add contact', (done) => {
        chai.request(server)
            .post('/contact')
            .send(contact)
            .then((res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                assert.match(res.body.data._id, /\w/, 'id must be set');
                done();
            }).catch((err) => {
                done(err);
            })

    })

    it('should be able to retrieve contacts', (done) => {
        chai.request(server)
            .get('/contact/list')
            .then((res) => {
                res.should.have.status(200);
                should.exist(res.body);
                res.body.should.be.a('object');
                res.body.data.should.be.a('array');
                done();
            }).catch((err) => {
                done(err);
            })
    })
})