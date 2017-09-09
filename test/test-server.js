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
                const expectedKeys = ['id', 'author', 'content', 'title', 'publishDate'];
                res.body.forEach(function (item) {
                    item.should.include.keys(expectedKeys);
                })
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
                res.body.should.deep.equal(Object.assign(newPost, { id: res.body.id, publishDate: res.body.publishDate }));
            })

    })

    it('should remove an item on DELETE', function () {
        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                return chai.request(app)
                    .delete(`/blog-posts/${res.body[0].id}`)
            })
            .then(function (res) {
                res.should.have.status(204);
            })
    })

    it('should update items on PUT', function () {
        const updateData = { title: "newTitle", content: "newContent", author: "Chris"};

        return chai.request(app)
            .get('/blog-posts')
            .then(function (res) {
                updateData.id = res.body[0].id;
                return chai.request(app)
                    .put(`/blog-posts/${updateData.id}`)
                    .send(updateData);
            })
            .then(function (res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.deep.equal(updateData);

            })
    });
})