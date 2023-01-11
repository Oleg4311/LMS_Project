"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: 'id' });
      this.hasMany(models.Event, { foreignKey: "user_id" });
      this.hasMany(models.Member, { foreignKey: "user_id" });
      this.hasMany(models.UserInfo, { foreignKey: "user_id" });
      this.hasMany(models.Vote, { foreignKey: "user_id" });
      this.hasMany(models.Answer, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      group_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
