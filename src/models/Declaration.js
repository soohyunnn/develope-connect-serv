/*
신고 내역(레터, 답장, 댓글)
*/
module.exports = function (sequelize, DataTypes) {
  var Declaration = sequelize.define("Declaration", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //신고내역 고유번호
    declaration_id: { type: DataTypes.INTEGER }, //레터,댓글,답글 고유번호
    content: { type: DataTypes.STRING }, //신고내용
    type: { type: DataTypes.STRING }, //신고 대상(LETTER(레터), REPLY(답장), COMMENT(댓글))
    status: { type: DataTypes.STRING }, //처리상태(대기(WAIT), 삭제(REMOVE), 반려(REJECT))
    user_id: { type: DataTypes.STRING }, //작성자 Id
    user_name: { type: DataTypes.STRING }, //작성자명
    count: { type: DataTypes.INTEGER }, //신고횟수
    letter_title: { type: DataTypes.STRING(255) }, //레터제목
    letter_content: { type: DataTypes.STRING(255) }, //레터내용
    reply_content: { type: DataTypes.STRING(255) }, //답글내용
    comment_content: { type: DataTypes.STRING(255) }, //댓글 내용
    file_ids: { type: DataTypes.JSON }, //이미지/동영상 번호
    processing_at: { type: DataTypes.DATE }, //처리일시
    created_by: {
      type: DataTypes.INTEGER,
      comment: "작성자",
    },
  });

  Declaration.associate = (models) => {
    Declaration.belongsTo(models.Account, {
      foreignKey: "created_by",
    });
  };
  return Declaration;
};
