module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define("Account", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.STRING(255), unique: true },
    name: { type: DataTypes.STRING(255), unique: true },
    password: { type: DataTypes.STRING(255) },
    email: { type: DataTypes.STRING(255) },
    serviceAgree: { type: DataTypes.BOOLEAN },
    informationAgree: { type: DataTypes.BOOLEAN },
    bankName: { type: DataTypes.STRING(255) },
    accountNumber: { type: DataTypes.STRING(255) },
    accountHolder: { type: DataTypes.STRING(255) },
    // activate: { type: DataTypes.BOOLEAN }, //활성화(true), 휴먼(false)
    status: { type: DataTypes.BOOLEAN, defaultValue: false }, //탈퇴 (true: 탈퇴, fasle: 탈퇴X)
    reasonForWithdrawal: { type: DataTypes.STRING(255) }, //탈퇴 사유
    restStatus: { type: DataTypes.BOOLEAN, defaultValue: false }, //휴식상태(true: 휴식상태, false: 휴식상태 X) => 이게 휴면
    kakao: { type: DataTypes.STRING(255) },
    naver: { type: DataTypes.STRING(255) },
    facebook: { type: DataTypes.STRING(255) },
    google: { type: DataTypes.STRING(255) },
    apple: { type: DataTypes.STRING(255) },
    imageId: { type: DataTypes.JSON },
    representativeImage: { type: DataTypes.INTEGER }, //대표 이미지
    statusMessage: { type: DataTypes.STRING(500) },
    instagramAccount: { type: DataTypes.STRING(255) },
    facebookAccount: { type: DataTypes.STRING(255) },
    youtubeAccount: { type: DataTypes.STRING(255) },
    certification: { type: DataTypes.BOOLEAN }, //인증여부
    category: { type: DataTypes.STRING(255) }, //카테고리
    receiveNewLetterYn: { type: DataTypes.BOOLEAN }, //신규 레터 수신 여부 (true: 수신, false: 수신 X)
    receiveReplyYn: { type: DataTypes.BOOLEAN }, //답장 수신 (true: 수신, false: 수신 X)
    commentNotificationsYn: { type: DataTypes.BOOLEAN }, //댓글 알림 (true: 수신, false: 수신 X)
    likeNotificationsYn: { type: DataTypes.BOOLEAN }, //좋아요 알림 (true: 수신, false: 수신 X)
    doNotDisturbYn: { type: DataTypes.BOOLEAN }, //방해금지모드 (true: 수신, false: 수신 X)
    doNotDisturbStartTime: { type: DataTypes.STRING(255) }, //방해금지모드 시작시간
    doNotDisturbEndTime: { type: DataTypes.STRING(255) }, //방해금지모드 종료시간
    loginOn: {
      type: DataTypes.DATE,
      // defaultValue: DataTypes.NOW,  //자동으로 현재 날짜 들어가는 속성
    },
  });
  // Account.belongsTo(Subcribe, { foreignKey: "id" });
  return Account;
};
