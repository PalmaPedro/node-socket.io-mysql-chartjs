exports.seed = function (knex) {
  return knex('users').select().then(users => {
    return knex('sensors').insert([
      { serial_no: '12345', user_id: users[0].id, data_id: data[0].id }
    ]);
  });
};
