//결제내역(인앱)
module.exports = function (sequelize, DataTypes) {
  var Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //고유번호
    iapJson: { type: DataTypes.STRING }, //??,
    payment_amount: { type: DataTypes.STRING }, //결제금액,
    user_id: {
      type: DataTypes.INTEGER,
      comment: "사용자",
    },
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return Payment;
};
