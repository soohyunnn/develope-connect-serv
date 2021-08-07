//정산
module.exports = function (sequelize, DataTypes) {
  var Settlement = sequelize.define("Settlement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //고유번호
    user_id: { type: DataTypes.INTEGER }, //결제자 고유 ID
    user_user_id: { type: DataTypes.STRING }, //결제자 id
    user_name: { type: DataTypes.STRING }, //결제자 이름
    total_amount: { type: DataTypes.INTEGER }, //총금액,
    settlement_amount: { type: DataTypes.INTEGER }, //정산금액,
    fee: { type: DataTypes.INTEGER }, //수수료,settlement month
    settlement_month: { type: DataTypes.STRING }, //정산월(202108)
    settlement_yn: { type: DataTypes.BOOLEAN }, //정산 처리 여부,
    settlement_at: { type: DataTypes.DATE }, //정산 완료 일시
    user_id: {
      type: DataTypes.INTEGER,
      comment: "사용자",
    },
  });

  Settlement.associate = (models) => {
    Settlement.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return Settlement;
};
