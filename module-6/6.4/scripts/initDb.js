import db from '../db/dbconn.js'
const fs = require ('fs');
const path = require ('path');

// Read SQL file
const sqlFilePath = path.resolve('scripts', 'setup-db.sql');
fs.readFileSync(sqlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Failed to read SQL file:', err);
        return;
    }

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
});
