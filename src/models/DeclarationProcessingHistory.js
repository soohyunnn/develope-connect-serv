//신고 처리내역
module.exports = function (sequelize, DataTypes) {
  const DeclarationProcessingHistory = sequelize.define(
    "DeclarationProcessingHistory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      declaration_id: { type: DataTypes.INTEGER },
      status: { type: DataTypes.STRING(255) }, //처리상태 (대기(WAIT) ,승인(APPROVAL), 반려(REJECT))
      content: { type: DataTypes.STRING(1000) }, //반려사유
    }
  );

  return DeclarationProcessingHistory;
};
