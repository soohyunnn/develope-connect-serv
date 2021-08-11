module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("post", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255) }, //제목
    content: { type: DataTypes.STRING(255) }, //내용
    empathy: { type: DataTypes.INTEGER }, //공감수
    field: { type: DataTypes.STRING(255) }, //분야
    hashtags: { type: DataTypes.JSON }, //해시태그
    image_ids: { type: DataTypes.JSON }, //이미지 ids
    category: { type: DataTypes.JSON }, //카테고리
    loginOn: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.INTEGER,
      comment: "작성자",
    },
    modified_by: {
      type: DataTypes.INTEGER,
      comment: "수정자",
    },
  });
  Post.associate = (models) => {
    Post.belongsTo(models.account, {
      foreignKey: "created_by",
    });
    Post.belongsTo(models.account, {
      foreignKey: "modified_by",
    });
  };
  return Post;
};
