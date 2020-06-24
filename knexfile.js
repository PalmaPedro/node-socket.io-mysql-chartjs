const credentials = require("./config/mysql.Credentials");

const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        database: credentials.database,
        user: credentials.user,
        password: credentials.password
      },
      ...knexSnakeCaseMappers()
    }
};
