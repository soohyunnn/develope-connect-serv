module.exports = function (sequelize, DataTypes) {
  const HashTag = sequelize.define("hash_tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255) }, //해시태그명
    loginOn: {
      type: DataTypes.DATE,
    },
  });
  return HashTag;
};
