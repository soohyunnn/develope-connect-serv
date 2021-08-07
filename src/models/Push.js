//푸시기록
module.exports = function (sequelize, DataTypes) {
  var Push = sequelize.define("Push", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //고유번호
    title: { type: DataTypes.STRING }, //푸시제목,
    content: { type: DataTypes.STRING }, //푸시내용,
    read_yn: { type: DataTypes.BOOLEAN }, //읽음여부
    user_id: {
      type: DataTypes.INTEGER,
      comment: "사용자",
    },
  });

  Push.associate = (models) => {
    Push.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return Push;
};
