/*
레터 답글
*/
module.exports = function (sequelize, DataTypes) {
  var Reply = sequelize.define("Reply", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //레터답글 고유번호
    content: { type: DataTypes.STRING }, //내용
    reply_letter_id: { type: DataTypes.INTEGER }, //답장한레터 고유번호
    save_state: { type: DataTypes.BOOLEAN }, //저장상태(true: 저장완료, false: 임시저장)
    declaration_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //신고여부(true: 신고O, false: 신고X => true이면 목록에 안보임)
    sender_id: {
      type: DataTypes.INTEGER,
      comment: "보내는 사람",
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      comment: "받는 사람",
    },
  });

  Reply.associate = (models) => {
    Reply.belongsTo(models.Account, {
      foreignKey: "sender_id",
    });
    Reply.belongsTo(models.Account, {
      foreignKey: "recipient_id",
    });
  };
  return Reply;
};
