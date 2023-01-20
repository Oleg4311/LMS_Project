'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Room, { foreignKey: 'room_id' });
      this.belongsTo(models.User,{ foreignKey: 'profile_id' });
    }
  }
  UserChat.init({
    name: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    profile_id: DataTypes.INTEGER,
    isGroup: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserChat',
  });
  return UserChat;
};
