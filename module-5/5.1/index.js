const express = require('express');
const app = express();
const PORT = 8080;

// Index page
app.get ('/', function (req, res) {
    res.send ('Hello World!');
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
