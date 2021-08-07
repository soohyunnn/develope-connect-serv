//회원탈퇴
module.exports = function (sequelize, DataTypes) {
  const AccountSecession = sequelize.define("AccountSecession", {
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
    status: { type: DataTypes.BOOLEAN }, //탈퇴 (true: 탈퇴, fasle: 탈퇴X)
    reasonForWithdrawal: { type: DataTypes.STRING(255) }, //탈퇴 사유
    restStatus: { type: DataTypes.BOOLEAN }, //휴식상태(true: 휴식상태, false: 휴식상태 X)
    compulsionSecessionYn: { type: DataTypes.BOOLEAN, defaultStatus: false }, //강제탈퇴여부 true: 강제탈퇴, false: 강제탈퇴 X
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
    joinAt: { type: DataTypes.DATE }, //가입일시
    loginOn: {
      type: DataTypes.DATE,
      // defaultValue: DataTypes.NOW,  //자동으로 현재 날짜 들어가는 속성
    },
  });
  return AccountSecession;
};
//createdAt : 탈퇴일시
