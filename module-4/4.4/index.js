const express = require('express');
const path = require('path');
const htmlDir = path.join(__dirname, 'public');

const app = express();

const PORT = 3000;

// Index page
app.get ('/', function (req, res) {
    res.sendFile(path.join(htmlDir, 'index.html'));
});

// Blog page
app.get('/blog', function (req, res) {
    res.sendFile(path.join(htmlDir, 'blog.html'));
})

// Hello page
app.get('/hello', function(req, res){
    res.sendFile(path.join(htmlDir, 'hello.html'));
})

// About page
app.get('/about', function(req, res){
    res.sendFile(path.join(htmlDir, 'about.html'))
})


app.listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}`);
});