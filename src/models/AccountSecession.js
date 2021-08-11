//회원탈퇴
module.exports = function (sequelize, DataTypes) {
  const AccountSecession = sequelize.define("account_secession", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.STRING(255), unique: true },
    name: { type: DataTypes.STRING(255), unique: true },
    password: { type: DataTypes.STRING(255) },
    email: { type: DataTypes.STRING(255) },
    service_agree: { type: DataTypes.BOOLEAN },
    information_agree: { type: DataTypes.BOOLEAN },
    status: { type: DataTypes.BOOLEAN, defaultValue: false }, //탈퇴 (true: 탈퇴, fasle: 탈퇴X)
    image_id: { type: DataTypes.INTEGER },
    category: { type: DataTypes.JSON }, //카테고리
    loginOn: {
      type: DataTypes.DATE,
    },
  });
  return AccountSecession;
};
