'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Lectures, { foreignKey: 'id' });
    }
  }
  File.init({
    name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    lectures_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};