import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from "mongoose";

const app = express();
import { PORT, MONGO_URI, MONGO_DB_NAME } from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/userRouter.js';

app.use (cors());


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use (morgan('combined'));

// MongoDB Connection
mongoose
  .connect(`${MONGO_URI}/${MONGO_DB_NAME}`)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

//blog Routes
app.use ('/blogs', blogsRouter);

//user Routes
app.use ('/users', usersRouter);


//index Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})



app.listen(PORT, () => console.log(`server started on port ${PORT}`));
