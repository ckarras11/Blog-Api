const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server.js');

const should = chai.should();

chai.use(chaiHttp);

describe('blog-posts', function () {

    before(function () {
        return runServer;
    });

    after(function () {
        return closeServer;
    });

    it('should list items on GET', function () {
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                res.should.have.status(200);
                res.body.length.should.be.at.least(1);
                res.should.be.json;
                res.body.should.be.a('array');
            });
    });

    it('should add items on POST', function () {

        const newPost = {
            title: 'Chris',
            content: 'dsojfasdijfisoajfdiosjfiosdjfasiod',
            author: 'Cassie',
        }
        return chai.request(app)
            .post('/blog-posts')
            .send(newPost)
            .then(function (res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                console.log(Object.keys(res.body).length)
                res.body.forEach(key => {
                    res.body[key]
                })
                
        })

    })

    it('should remove an item on DELETE', function () {
        test

    })

    it('should update items on PUT', function () {

    })

})