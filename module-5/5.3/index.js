const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require ('body-parser');
const cors = require ('cors');

app.use (cors());

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
;

// Hello Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})

//Dummy Blog Posts
var blogs = [
    {id: 1, title: 'Blog 1', content: 'This is the Blog 1 content'},
    {id: 2, title: 'Blog 2', content: 'This is the Blog 2 content'},
    {id: 3, title: 'Blog 3', content: 'This is the Blog 3 content'},
    {id: 4, title: 'Blog 4', content: 'This is the Blog 4 content'}
];

//Get Blogs
app.get ('/blogs', function (req, res) {
    res.json(blogs)
})



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
