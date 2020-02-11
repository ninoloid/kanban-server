'use strict';
module.exports = (sequelize, DataTypes) => {
  class Category extends sequelize.Sequelize.Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, { sequelize });
  return Category;
};