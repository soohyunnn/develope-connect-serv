//대댓글(댓글에 대한 댓글)
//대댓글 고유번호, 레터 번호, 댓글 번호, 등록자, 등록날짜, 수정날짜, 상태(삭제유무 = 삭제 시 false)
module.exports = function (sequelize, DataTypes) {
  var ReplyComments = sequelize.define("ReplyComments", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //레터 고유번호
    letter_id: { type: DataTypes.INTEGER }, //레터 고유번호
    comment_id: { type: DataTypes.INTEGER }, //댓글 고유번호
    content: { type: DataTypes.STRING }, //대댓글 내용
    status: { type: DataTypes.BOOLEAN }, //삭제유무(true: 삭제O, false : 삭제X)
    user_id: {
      type: DataTypes.INTEGER,
      comment: "등록자",
    },
  });

  ReplyComments.associate = (models) => {
    ReplyComments.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return ReplyComments;
};
