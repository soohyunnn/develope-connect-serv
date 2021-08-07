//해시태그
module.exports = function (sequelize, DataTypes) {
  var Hashtag = sequelize.define("Hashtag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //고유번호
    title: { type: DataTypes.STRING }, //해시태크 이름
  });

  return Hashtag;
};
