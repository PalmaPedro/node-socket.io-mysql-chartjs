exports.seed = function (knex) {
  return knex('sensors').select().then(sensors => {
    return knex('data').insert([
      { temperature: 5, sensor_id: sensors[0].id }
    ]);
  });
};

// sensor_id: sensors[0].id 