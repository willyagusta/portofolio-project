import pg from 'pg';
import { POSTGRES_URL } from '../config.js';

console.log(`=== debug: POSTGRES_URL: ${POSTGRES_URL}`);
const db = new pg.Pool({
    connectionString: POSTGRES_URL,
});

// Function to connect to the database
const connectToDatabase = async () => {
    try {
        const client = await db.connect(); // Use db to connect
        console.log('You are successfully connected to the database');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process if there's an error
    }
};

// Export the connect function for testing
export default db;
export { connectToDatabase };
