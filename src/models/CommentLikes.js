//댓글 좋아요
//좋아요 목록 고유번호, 레터 번호, 사용자, 등록날짜(좋아요 한 날짜)
module.exports = function (sequelize, DataTypes) {
  var CommentLikes = sequelize.define("CommentLikes", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //댓글 좋아요 고유번호
    comment_id: { type: DataTypes.INTEGER }, //댓글 고유번호

    user_id: {
      type: DataTypes.INTEGER,
      comment: "등록자",
    },
  });

  CommentLikes.associate = (models) => {
    CommentLikes.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return CommentLikes;
};
