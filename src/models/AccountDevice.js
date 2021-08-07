//사용자 디바이스 정보
module.exports = function (sequelize, DataTypes) {
  var AccountDevice = sequelize.define("AccountDevice", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //고유번호
    device_token: { type: DataTypes.STRING }, //디바이스 토큰
    user_id: {
      type: DataTypes.INTEGER,
      comment: "사용자",
    },
  });

  AccountDevice.associate = (models) => {
    AccountDevice.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return AccountDevice;
};
