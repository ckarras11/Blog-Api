const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const {BlogPosts} = require('./models')
const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create('test', 'Dolor amet voluptate sint', 'Chris', Date.now())
BlogPosts.create('test 2', 'This is another test', 'Chris', Date.now())
BlogPosts.create('test 3', 'This is a third test', 'Chris', Date.now())

app.get('/blog-posts', (request, response) => {
    response.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (request, response) => {
    const requiredFields = ['title', 'content', 'author'];
    requiredFields.forEach((field, index) => {
        field = requiredFields[index];
        if(!(field in request.body)){
            const message = `Post must include field: ${field}`
            console.log(message);
            response.status(400).send(message);
        }   
    })
    const post = BlogPosts.create(request.body.title, request.body.content, request.body.author, request.body.date);
    response.status(201).json(post);
});





app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`)
})
