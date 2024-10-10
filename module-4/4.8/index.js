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
app.get('/', function (req, res) {
    res.render('index')
  });
  
  // User page with dynamic userId parameters from url
  // The '?' means we may not receive this parameter; (eg: localhost:3000/user) but we should still render the route.
  app.get('/users/:userId?', function (req, res) {
    const users = [
      { userId: 1, name: 'John', email: 'john@example.com' },
      { userId: 2, name: 'Jack', email: 'jack@example.com' },
      { userId: 3, name: 'Sara', email: 'sara@example.com' },
      { userId: 4, name: 'Lily', email: 'lily@example.com' },
      { userId: 4, name: 'Susan', email: 'susan@example.com' },
    ]
    // Get the userId from the request url
    const userId  = req.params.userId; 
    
    // Filter the users array for a matching user by ID. 
    var user = users.find((u) => u.userId.toString() === userId) // Note that the 'userId' parameter will be a string, not an integer.
    console.log(`userId: `, userId);
    console.log(`user: `, user);
    res.render('user', {user: user});
  });
  

// Hello page with username extracted from query parameters
app.get('/hello', function (req, res) {
    const name = req.query.name || 'Anonymous User';
    console.log(`query parameters: `, req.query);
    res.render('hello', { username: name });
});

app.listen(PORT, function() {
    console.log(`Server started at http://localhost:${PORT}`);
});