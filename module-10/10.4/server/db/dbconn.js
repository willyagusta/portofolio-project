import pg from 'pg';
import { Sequelize } from 'sequelize';
import { POSTGRES_URL } from '../config.js';

const sequelize = new Sequelize(POSTGRES_URL, {
    dialect: 'postgres',
});

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

// Function to disconnect from the database
export const disconnectFromDatabase = async () => {
    try {
      await sequelize.close();
      console.log('Connection to PostgreSQL has been closed successfully.');
    } catch (error) {
      console.error('Unable to close the database connection:', error);
    }
  };

// Export the query function for executing SQL queries
const query = (text, params) => db.query(text, params);

// Export the connect function for testing
export default db;
export { connectToDatabase, query };

