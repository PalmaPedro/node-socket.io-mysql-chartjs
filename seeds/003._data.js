exports.seed = function (knex) {
  return knex('sensors').select().then(sensors => {
    return knex('data').insert([
      { temperature:  '23.7',  sensor_id: sensors[0].id },
      { temperature:  '25.0', sensor_id: sensors[0].id },
      { temperature:  '28.6', sensor_id: sensors[0].id }
    ])
  });
};
