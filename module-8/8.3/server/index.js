import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';


const app = express();
import { PORT } from './config.js';
import blogsRouter from './routes/blogsRouter.js';
import usersRouter from './routes/usersRouter.js';
import db from './db/dbconn.js';

app.use (cors());


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use (morgan('combined'));

// Serve static files from the 'client/build' directory when in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(path.resolve(), 'client/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(), 'client/build', 'index.html'));
    });
  }

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

