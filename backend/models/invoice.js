'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.Sale, {
        foreignKey: "invoiceId"
    })
    }
  }
  Invoice.init({
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    paymentType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'invoice',
  });
  return Invoice;
};