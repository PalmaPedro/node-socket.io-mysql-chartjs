
exports.up = function(knex) {
    return knex.schema
        /*.createTable('users', (table) => {
            table.increments('id');
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable();
            table
                .dateTime('updates_at')
                .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('sensors', (table) => {
            table.increments('id');
            table.integer('serial_no').notNullable();
            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id'); // foreign key
            table
                .dateTime('updated_at')
                .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })*/
        .createTable('data', (table) => {
            table.increments('id');
            table.float('temperature').notNullable();
            //table.integer('sensor_id').unsigned().notNullable();
            //table.foreign('sensor_id').references('sensors.id'); // foreign key
            table
                .dateTime('updated_at')
                .defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.timestamp('created_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('data')
        .dropTableIfExists('sensors')
        .dropTableIfExists('users');
};
