module.exports = function (sequelize, DataTypes) {
  var Subscribe = sequelize.define("Subscribe", {
    ranker_id: {
      type: DataTypes.INTEGER,
      comment: "랭커",
    },
    subscriber_id: {
      type: DataTypes.INTEGER,
      comment: "구독자",
    },
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING },
  });

  Subscribe.associate = (models) => {
    Subscribe.belongsTo(models.Account, {
      foreignKey: "ranker_id",
    });
    Subscribe.belongsTo(models.Account, {
      foreignKey: "subscriber_id",
    });
  };
  // Subscribe.belongsTo(Account, { foreignKey: "id" });
  // Subscribe.prototype.dateFormat = (date) => moment(date).format("YYYY-MM-DD");

  return Subscribe;
};
