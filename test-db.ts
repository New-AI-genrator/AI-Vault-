import knex from 'knex';
import config from './knexfile';

async function testConnection() {
  const db = knex(config.development);
  
  try {
    // Test the connection
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful!');
    
    // Create a test table
    await db.schema.createTableIfNotExists('test_table', (table) => {
      table.increments('id');
      table.string('name');
    });
    
    console.log('✅ Test table created successfully!');
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await db.destroy();
  }
}

testConnection();
