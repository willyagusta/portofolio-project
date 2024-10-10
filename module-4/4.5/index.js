const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const PORT = 3000;

// Set the view engine for express to use Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: false,
}));
app.set('view engine', 'hbs');


// Index page
app.get ('/', function (req, res) {
    res.render('index');
});

// Hello page - Sam
app.get('/hello-sam', function (req, res) {
    res.render('hello', {username: "Sam"});
})

// Hello page - Sue
app.get('/hello-sue', function(req, res){
    res.render('hello', {username: "Sue"});
})

// Hello page - Tom
app.get('/hello-tom', function(req, res){
    res.render('hello', {username: "Tom"});
})

// Hello page - Jerry
app.get('/hello-jerry', function(req, res){
    res.render('hello', {username: "Jerry"});
})


app.listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}`);
});