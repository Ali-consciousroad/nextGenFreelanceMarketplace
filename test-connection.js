// filepath: /home/mcfly/ConsciousRoad/TFE/nextgen-freelance-marketplace/test-connection.js
const pool = require('./db');

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log("Connected to the database.");
  } catch (err) {
    console.error('Connection error:', err.stack);
  } finally {
    client.release();
    console.log("Closed the database connection.");
  }
}

testConnection();