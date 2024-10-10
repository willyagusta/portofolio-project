import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
import { PORT } from './config.js';

import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/userRouter.js';
import connectDB from './db/dbconn.js';

app.use (cors());


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use (morgan('combined'));

// MongoDB Connection
connectDB();

//blog Routes
app.use ('/blogs', blogsRouter);

//user Routes
app.use ('/users', usersRouter);


//index Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
