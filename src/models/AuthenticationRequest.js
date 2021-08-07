module.exports = function (sequelize, DataTypes) {
  const AuthenticationRequest = sequelize.define("AuthenticationRequest", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING(255), unique: true }, //요청자ID
    name: { type: DataTypes.STRING(255) }, //본명
    requestName: { type: DataTypes.STRING(255) }, //요청자명
    activityName: { type: DataTypes.STRING(255) }, //활동명
    activityField: { type: DataTypes.STRING(255) }, //활동분야
    imageId: { type: DataTypes.INTEGER }, //신분증
    status: { type: DataTypes.STRING(255) }, //처리상태 (대기(WAIT) ,승인(APPROVAL), 반려(REJECT))
    content: { type: DataTypes.STRING(1000) }, //반려사유
  });

  return AuthenticationRequest;
};
