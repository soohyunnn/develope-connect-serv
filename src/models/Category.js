module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255) }, //카테고리명
    order: { type: DataTypes.INTEGER }, //카테고리 순서
    loginOn: {
      type: DataTypes.DATE,
    },
  });
  return Category;
};
