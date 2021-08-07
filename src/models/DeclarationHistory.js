/*
신고 내역 기록(레터, 답장, 댓글)
*/
module.exports = function (sequelize, DataTypes) {
  var DeclarationHistory = sequelize.define("DeclarationHistory", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //신고내역 고유번호
    declaration_id: { type: DataTypes.INTEGER }, //레터,댓글 고유번호
    type: { type: DataTypes.STRING }, //신고 대상(LETTER(레터), REPLY(답장), COMMENT(댓글))
    content: { type: DataTypes.STRING }, //신고내용
    user_id: { type: DataTypes.STRING }, //작성자 Id
    user_name: { type: DataTypes.STRING }, //작성자명
    created_by: {
      type: DataTypes.INTEGER,
      comment: "작성자",
    },
  });

  DeclarationHistory.associate = (models) => {
    DeclarationHistory.belongsTo(models.Account, {
      foreignKey: "created_by",
    });
  };
  return DeclarationHistory;
};
