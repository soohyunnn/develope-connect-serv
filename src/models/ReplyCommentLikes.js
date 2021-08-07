//대댓글 좋아요
//좋아요 목록 고유번호, 레터 번호, 사용자, 등록날짜(좋아요 한 날짜)
module.exports = function (sequelize, DataTypes) {
  var ReplyCommentLikes = sequelize.define("ReplyCommentLikes", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //대댓글 좋아요 고유번호
    reply_comment_id: { type: DataTypes.INTEGER }, //대댓글 고유번호

    user_id: {
      type: DataTypes.INTEGER,
      comment: "등록자",
    },
  });

  ReplyCommentLikes.associate = (models) => {
    ReplyCommentLikes.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return ReplyCommentLikes;
};
