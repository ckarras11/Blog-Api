const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

const {BlogPosts} = require('./models')
const jsonParser = bodyParser.json();
const app = express();


// Creates intital blog posts

BlogPosts.create('test', 'Dolor amet voluptate sint', 'Chris', Date.now())
BlogPosts.create('test 2', 'This is another test', 'Chris', Date.now())
BlogPosts.create('test 3', 'This is a third test', 'Chris', Date.now())


// Get request

router.get('/', (request, response) => {
    response.json(BlogPosts.get());
});

// Post request

router.post('/', jsonParser, (request, response) => {
    const requiredFields = ['title', 'content', 'author'];
    requiredFields.forEach((field, index) => {
        field = requiredFields[index];
        // Checks to make sure all required fields are entered
        if(!(field in request.body)){
            const message = `Post must include field: ${field}`
            console.log(message);
            response.status(400).send(message);
        }   
    })
    const post = BlogPosts.create(request.body.title, request.body.content, request.body.author, request.body.date);
    response.status(201).json(post);
});

// Delete request

router.delete('/:id', (request, response) => {
    BlogPosts.delete(request.params.id);
    response.status(204).end();
});

// Put request

router.put('/:id', jsonParser, (request, response) => {
    const requiredFields = ['title', 'content', 'author'];
    requiredFields.forEach((field, index) => {
        field = requiredFields[index];
        if(!(field in request.body)){
            const message = `Body must include field ${field}`
            console.log(message);
            response.status(400).send(message);
        }
    });
    if(request.params.id !== request.body.id){
        const message = `Params id ${request.params.id} must match body id ${request.body.id}`;
        console.log(message);
        response.status(400).send(message);
    }
    const updatedItem = BlogPosts.update({
        id: request.params.id,
        title: request.body.title,
        content: request.body.content,
        author: request.body.author,
        publishDate: request.body.date
    });
    response.json(updatedItem);
});

module.exports = router;