'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Vote, { foreignKey: 'vote_id' });
    }
  }
  Answer.init({
    data: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    vote_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
