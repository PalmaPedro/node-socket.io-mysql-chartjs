exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'test', password: 'test', email: 'admin@gmail.com' }
  ]);
};
