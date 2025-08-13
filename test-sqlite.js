// Simple SQLite test script
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

db.serialize(() => {
  // Create a table
  db.run('CREATE TABLE IF NOT EXISTS test (id INT, name TEXT)');
  
  // Insert a row
  db.run('INSERT INTO test (id, name) VALUES (?, ?)', [1, 'Test Entry']);
  
  // Query the data
  db.each('SELECT id, name FROM test', (err, row) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('✅ Database test successful!');
      console.log('Row:', row);
    }
  });
});

db.close();
