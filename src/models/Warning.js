/*
경고레터
*/
module.exports = function (sequelize, DataTypes) {
  var Warning = sequelize.define("Warning", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //경고레터 고유번호
    title: { type: DataTypes.STRING }, //제목
    content: { type: DataTypes.STRING }, //내용
    sender_id: {
      type: DataTypes.INTEGER,
      comment: "보내는 사람",
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      comment: "받는 사람",
    },
  });

  Warning.associate = (models) => {
    Warning.belongsTo(models.Account, {
      foreignKey: "sender_id",
    });
    Warning.belongsTo(models.Account, {
      foreignKey: "recipient_id",
    });
  };
  return Warning;
};
