const { Model } = require('objection');

const User = require('./User.js');
const Data = require('./Data.js');

class Sensor extends Model {
    static tableName = 'sensors';
    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'sensors.userId',
                to: 'users.id'
            }
        },
        data: {
            relation: Model.HasOneRelation,
            modelClass: Data,
            join: {
                from: 'sensors.id',
                to: 'data.sensorId'
            }
        }
    }
}

module.exports = Sensor;