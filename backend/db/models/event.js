'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id' });
    }
  }
  Events.init({
    name: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    start: DataTypes.DATE,
    finish: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};