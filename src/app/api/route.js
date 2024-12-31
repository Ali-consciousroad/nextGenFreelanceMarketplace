// READ
/* Handles the API requests to retrieve all todos from the PostgreSQL db, 
exectues the query, and returns the results as a JSON response. 
It ensures proper error handling and releases the DB connection after use.
*/
// Import the necessary modules for PostgreSQL
import pool from '../../../db';
import { NextResponse } from 'next/server';

// Handler for GET requests to retrieve all todos
export async function GET(req) {
  let client;
  try {
    // Get a client from the connection pool
    client = await pool.connect();

    // Query to get all todos from the "todo" table
    const result = await client.query('SELECT * FROM todo');

    // Return the todos as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(result.rows), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  } finally {
    // Release the client back to the pool
    if (client) {
      client.release();
    }
  }
}