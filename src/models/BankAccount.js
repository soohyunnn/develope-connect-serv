//계좌
module.exports = function (sequelize, DataTypes) {
  const BankAccount = sequelize.define("BankAccount", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: DataTypes.STRING(255) },
    account_holder: { type: DataTypes.STRING(255) },
    bank_name: { type: DataTypes.STRING(255) },
    account_number: { type: DataTypes.STRING(255) },
    agreeYn: { type: DataTypes.BOOLEAN },
  });

  return BankAccount;
};
