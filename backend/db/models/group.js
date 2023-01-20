'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: "group_id" });
      this.hasMany(models.Lecture, { foreignKey: "group_id" });
      this.hasMany(models.Vote, { foreignKey: "group_id" });
      this.hasMany(models.UserInfo, { foreignKey: "group_id" });
      this.belongsTo(models.ArrayPair, { foreignKey: "id" });
      this.belongsTo(models.Room, { foreignKey: "id" });
    }
  }
  Group.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
