const { Model } = require('objection');

const Sensor = require('./Sensor.js');

class Data extends Model {
    static tableName = 'data';
    static relationMappings = {
        sensors: {
            relation: Model.BelongsToOneRelation,
            modelClass: Sensor,
            join: {
                from: 'data.sensorId',
                to: 'sensors.id'    
            }
        }
    }
}

module.exports = Data;