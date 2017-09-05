const express = require('express');
const morgan = require('morgan');

const blogPostsRouter = require('./blog-posts')
const app = express();

// Initializes logger

app.use(morgan('common'));


app.use('/blog-posts', blogPostsRouter);



// Initializes app listening on port 8080
app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`)
})
