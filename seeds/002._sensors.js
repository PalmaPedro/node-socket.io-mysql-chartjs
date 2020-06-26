exports.seed = function (knex) {
  return knex('users').select().then(users => {
    return knex('sensors').insert([
      { serial_no: '' }
    ]);
  });
};

// user_id: users[0].id