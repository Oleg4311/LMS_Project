'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Vote, { foreignKey: 'id' });
      this.hasMany(models.Answer, { foreignKey: "question_id" });
    }
  }
  Question.init({
    name: DataTypes.TEXT,
    data: DataTypes.TEXT,
    vote_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};