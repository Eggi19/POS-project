'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.Category, {
        foreignKey: "categoryId"
      })
      product.hasMany(models.Sale, {
        foreignKey: "productId"
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};