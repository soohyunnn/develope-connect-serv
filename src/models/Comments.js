//댓글(레터에 대한 댓글)
//댓글 고유번호, 레터번호, 등록자, 등록날짜, 수정날짜, 상태(삭제유무 = 삭제 시 false)
module.exports = function (sequelize, DataTypes) {
  var Comments = sequelize.define("Comments", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //레터 고유번호
    letter_id: { type: DataTypes.INTEGER }, //레터 고유번호
    content: { type: DataTypes.STRING }, //댓글 내용
    status: { type: DataTypes.BOOLEAN }, //삭제유무(true: 삭제O, false : 삭제X)
    declaration_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //신고여부(true: 신고O, false: 신고X => true이면 목록에 안보임)
    like_count: { type: DataTypes.INTEGER }, //좋아요 수
    user_id: {
      type: DataTypes.INTEGER,
      comment: "등록자",
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Account, {
      foreignKey: "user_id",
    });
  };
  return Comments;
};
