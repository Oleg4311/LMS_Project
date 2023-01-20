'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Group, { foreignKey: 'group_id' });
      this.hasMany(models.Answer, { foreignKey: 'vote_id' });
    }
  }
  Vote.init({
    name: DataTypes.TEXT,
    data: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    group_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};
