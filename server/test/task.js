let chai = require('chai');
let chaiHttp = require('chai-http')
let server = require('../index');


chai.should();
chai.use(chaiHttp);

const event = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    date: '12.12.2020'
};

const notValidEvent = {
    firstName: '<script>',
    lastName: '4534$34',
    email: 'john.doe@mail.com',
    date: '12.12.2020'
}

describe('Events /api/event', () => {
    it('should POST a new Event', (done) => {
        chai.request(server)
            .post('/api/event')
            .send(event)
            .end((err, response) => {
                response.should.have.status(201);
                done();
            })
    })

    it('should response with object', (done) => {
        chai.request(server)
            .post('/api/event')
            .send(event)
            .end((err, response) => {
                response.body.should.be.a('object');
                done();
            })
    })

    it('should call error when user put invalid characters', (done) => {
        chai.request(server)
            .post('/api/event')
            .send(notValidEvent)
            .end((err, response) => {
                response.should.have.status(400);
                done();
            })
    })

})