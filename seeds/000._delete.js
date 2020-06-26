
exports.seed = function(knex) {
  return knex('data').del()
    .then(function () {
      return knex('sensors').del()
        .then(function () {
          return knex('users').del();
        });
    });
};
