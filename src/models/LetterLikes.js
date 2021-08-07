//레터 좋아요
//좋아요 목록 고유번호, 레터 번호, 사용자, 등록날짜(좋아요 한 날짜)
module.exports = function (sequelize, DataTypes) {
  var LetterLikes = sequelize.define("LetterLikes", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //레터 좋아요 고유번호
    letter_id: { type: DataTypes.INTEGER }, //레터 고유번호
    letter_sender_id: { type: DataTypes.INTEGER }, //레터 보내는 사람
    letter_recipient_id: { type: DataTypes.INTEGER }, //레터 받는 사람
    user_id: {
      type: DataTypes.INTEGER,
      comment: "등록자",
    },
  });

  LetterLikes.associate = (models) => {
    LetterLikes.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return LetterLikes;
};
