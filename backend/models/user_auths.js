'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Auths extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Auths.init({
    user_id: DataTypes.INTEGER,
    identity_type: DataTypes.INTEGER,
    identifier: DataTypes.STRING,
    credential: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Auths',
  });
  return User_Auths;
};