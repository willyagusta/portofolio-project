const express = require('express');
const app = express();
const PORT = 8080;
const bodyParser = require ('body-parser');
const cors = require ('cors');

app.use (cors());

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
;

//Dummy Blog Posts
var blogs = [
    {id: 1, title: 'Blog 1', content: 'This is the Blog 1 content'},
    {id: 2, title: 'Blog 2', content: 'This is the Blog 2 content'},
    {id: 3, title: 'Blog 3', content: 'This is the Blog 3 content'},
    {id: 4, title: 'Blog 4', content: 'This is the Blog 4 content'}
];

// Find a single blog by ID
function blogsFindById (blogId) {
    return blogs.find((x) => x.id.toString() === id);
}

// Get the ID of the last blog entry
function blogsLastId () {
    return blogs[blogs.length - 1]?.id || 0;
};

// Create a new blog object with ID
function newBlog({ id, title, content }) {
    const blogId = id || blogsLastId() + 1;
    return {
        id: blogId,
        title,
        content,
    }
}

//Add new entry to array
function addBlog({ id, title, content }) {
    const blog = newBlog ({ title, content });
    blogs.push(blog);
}

// Hello Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})

//GET all blogs
app.get ('/blogs', function (req, res) {
    res.json(blogs)
})

//GET single blog
app.get ('/blogs/:id', function (req, res){
    const { id } = req.params;
    const blog = blogsFindById(id);
    if (!blog) {
        return res.status(404).json({ error: 'blog not found'});
    }
    res.status(200).json(blog)
})

//POST blog
app.post ('/blogs', (req, res) => {
    try {
        const { title, content } = req.body;
        if ( !title | !content ) {
            throw new Error('Either title or content is not there')
        }
        const blog = newBlog({ title, content });
        addBlog(blog);
        console.log ('posted blog: ', blog)
    }   catch (err) {
        return res.status(404).json({
            message: `invalid request: ${err.message}`,
        });
    }
    res.json(blogs)
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
