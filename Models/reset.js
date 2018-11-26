const sequelize = require('./connection')

const query = [
  'DROP SCHEMA public CASCADE',
  'CREATE SCHEMA public',
  'GRANT ALL ON SCHEMA public TO allstarsadmin',
  'GRANT ALL ON SCHEMA public TO public',
].join(';')

sequelize.query(query)
