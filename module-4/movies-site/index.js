const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const PORT = 3000;

// Set the view engine for express to use Handlebars
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'main',
}));

app.set('view engine', 'hbs');
app.use(express.static('public'));

// Home page
app.get ('/', function (req, res) {
    res.render('home');
});

// Movie page
app.get ('/movies', function (req, res) {
    res.render('movies');
});

// Login page
app.get ('/login', function (req, res) {
    res.render('login', {layout: ''});
})

app.listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}`);
});