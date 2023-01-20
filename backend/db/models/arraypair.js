'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArrayPair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: 'group_id' });
    }
  }
  ArrayPair.init({
    data: DataTypes.JSON,
    group_id: DataTypes.INTEGER,
    group_name: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'ArrayPair',
  });
  return ArrayPair;
};
