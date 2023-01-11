'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id' });
      this.hasMany(models.Member, { foreignKey: "event_id" });
    }
  }
  Event.init({
    name: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    start: DataTypes.DATE,
    finish: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};