const { Model } = require('objection');

const Sensor = require('./Sensor.js');

class User extends Model {
    static tableName = 'users';
    static relationMappings = {
        sensors: {
            relation: Model.HasManyRelation,
            modelClass: Sensor,
            join: {
                from: 'users.id',
                to: 'sensors.userId'
            }
        }
    }
}

module.exports = User;