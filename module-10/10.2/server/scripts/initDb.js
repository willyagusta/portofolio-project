import db from '../db/dbconn.js';
import fs from 'fs';
import path from 'path';

// Read SQL file
const sqlFilePath = path.resolve('scripts', 'setup-db.sql');
try {
    const data = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Executing SQL:', data);

    db.query(data)
        .then(() => {
            console.log('Database is initialized successfully.');
        })
        .catch((queryErr) => {
            console.error('Failed to initialize database:', queryErr);
        })
        .finally(() => {
            db.end();
        });
} catch (err) {
    console.error('Failed to read SL file:', err);
}

