const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Refresh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Refresh.init({
    token: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Refresh',
  });
  return Refresh;
};
