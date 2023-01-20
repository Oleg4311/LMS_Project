'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: "group_id" });
      this.hasMany(models.Message, { foreignKey: "room_id" });
      this.hasMany(models.UserChat, { foreignKey: "room_id" });
    }
  }
  Room.init({
    name: DataTypes.TEXT,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
