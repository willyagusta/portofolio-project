import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


import { PORT } from config.js;
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from '../5.10/routes/userRouter.js';

const app = express();
const PORT = 8080;

app.use (cors());

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
;

//blog Routes
app.use ('/blogs', blogsRouter);

//user Routes
app.use ('/users', usersRouter);


//index Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
