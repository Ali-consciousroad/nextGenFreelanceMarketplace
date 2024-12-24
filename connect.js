// Initialize the DB, creates tables, and inserts initial data 
// filepath: /home/mcfly/ConsciousRoad/TFE/nextgen-freelance-marketplace/connect.js
const pool = require('./db');

async function initializeDatabase() {
  const client = await pool.connect();

  try {
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS todo (
        id SERIAL PRIMARY KEY,
        task TEXT
      )
    `);
    console.log("Created todo table");

    // Delete items in todo table
    await client.query(`DELETE FROM todo`);
    console.log("Deleted items in todo table");

    // Sample values for insertion
    const values = [
      ['Buy groceries'],
      ['Walk Sam'],
      ['Fold laundry'],
      ['Workout']
    ];

    // SQL command for insertion
    const insertSql = `INSERT INTO todo (task) VALUES ($1) RETURNING id`;

    // Execute insert commands for each value
    for (const value of values) {
      const res = await client.query(insertSql, value);
      console.log(`Added todo item with id ${res.rows[0].id}`);
    }
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    client.release();
    console.log("Closed the database connection.");
  }
}

initializeDatabase();