exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'admin', password: 'admin', email: 'admin@gmail.com' }
  ]);
};
