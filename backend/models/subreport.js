'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubReport.init({
    invoiceId: DataTypes.INTEGER,
    reportId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubReport',
  });
  return SubReport;
};