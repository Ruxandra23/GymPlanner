export default {
  development: {
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: console.log
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  },
  production: {
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false
  }
};
