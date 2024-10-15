import 'dotenv/config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MONGO_DB_NAME, MONGO_URI } from './config.js';

async function connectDB () {
    try {
        await mongoose.connect (`${MONGO_URI}/${MONGO_DB_NAME}`, );
        console.log('Mongo DB connected');
    } catch (err) {
        console.log('MongoDB connection error:',err);
        process.exit(1);
    }
}