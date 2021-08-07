/*
레터
*/
module.exports = function (sequelize, DataTypes) {
  var Letter = sequelize.define("Letter", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //레터 고유번호
    title: { type: DataTypes.STRING }, //제목
    content: { type: DataTypes.STRING }, //내용
    reply_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //답장여부(true: 답장O, false: 답장X)
    reply_letter_id: { type: DataTypes.INTEGER }, //답장한레터 고유번호
    type: { type: DataTypes.STRING }, //레터 타입: 'LETTER' , 'REPLY'
    status: { type: DataTypes.BOOLEAN }, //공개설정(true: 전체공개, false : 받는사람만) = 숨김여부
    save_state: { type: DataTypes.BOOLEAN }, //저장상태(true: 저장완료, false: 임시저장)
    declaration_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //신고여부(true: 신고O, false: 신고X => true이면 목록에 안보임)
    read_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //읽음 여부(true: 읽음O, false: 읽음X)
    sent_delete_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //보낸레터 삭제여부(true: 삭제, false: 삭제X)
    received_delete_yn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //받은레터 삭제여부(true: 삭제, false: 삭제X)
    file_ids: { type: DataTypes.JSON }, //이미지/동영상 번호
    hashtag: { type: DataTypes.STRING }, //해시태그 (최대 10개)
    payment_amount: { type: DataTypes.INTEGER }, //결제금액
    like_count: { type: DataTypes.INTEGER }, //좋아요 수
    comment_count: { type: DataTypes.INTEGER }, //댓글 수
    share_count: { type: DataTypes.INTEGER }, //공유 수

    sender_id: {
      type: DataTypes.INTEGER,
      comment: "보내는사람",
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      comment: "받는사람",
    },
  });

  Letter.associate = (models) => {
    Letter.belongsTo(models.Account, {
      foreignKey: "sender_id",
    });
    Letter.belongsTo(models.Account, {
      foreignKey: "recipient_id",
    });
  };
  return Letter;
};
