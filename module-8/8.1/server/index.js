import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';


const app = express();
import { PORT } from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/userRouter.js';
import db from './db/dbconn.js';

app.use (cors());


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use (morgan('combined'));

//blog Routes
app.use ('/blogs', blogsRouter);

//user Routes
app.use ('/users', usersRouter);


//index Route
app.get ('/', function (req, res) {
    res.send ('Welcome to Index Page');
})


// Start server and ensure postgre database is connected

const startServer = async () => {
    try {
        await db.connect();
    

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
} catch (error) {
    console.error ('Failed to connect to database:', error);
    process.exit(1);
}

};


startServer();

