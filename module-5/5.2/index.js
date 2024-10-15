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
    res.send ('Hello World!');
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
