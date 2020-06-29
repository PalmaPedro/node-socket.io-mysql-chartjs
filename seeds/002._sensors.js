exports.seed = function (knex) {
  return knex('users').select().then(users => {
    return knex('sensors').insert([
      { serial_no: 'xEf21D', user_id: users[0].id }
    ]);
  });
};

// user_id: users[0].id