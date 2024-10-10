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


// Index page
app.get ('/', function (req, res) {
    res.render('index');
});

// User page with dynamic userId parameters from url
app.get('/user/:userId', function (req, res) {
    const userId = req.params.userId;
    res.render('user', {userId: userId});
})

// Hello page with username extracted from query parameters
app.get('/hello', function (req, res) {
    const name = req.query.username || 'Anonymous User';
    console.log(`query parameters: `, req.query.name);
    res.render('hello', { username: name });
});

app.listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}`);
});