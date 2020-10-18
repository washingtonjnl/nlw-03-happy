import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('🗂  Connection to the database successfully made');
});
