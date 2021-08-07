/*
파일
*/
module.exports = function (sequelize, DataTypes) {
  var Files = sequelize.define("Files", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, //파일 고유번호
    content_type: { type: DataTypes.STRING }, //파일형식(image/jpeg)
    extension: { type: DataTypes.STRING }, //확장자
    filename: { type: DataTypes.STRING }, //파일명
    path: { type: DataTypes.STRING }, //파일경로
    size: { type: DataTypes.INTEGER }, //파일 사이즈
    thumbnailId: {type: DataTypes.INTEGER}  //썸네일 파일 번호
  });

  return Files;
};
