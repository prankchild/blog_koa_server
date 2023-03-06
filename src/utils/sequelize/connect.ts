export const connect = (sequelize: any) => {
  sequelize.authenticate().then(async () => {
    // 标签连接表与标签表的链接
    sequelize.models["blog_article_label"].hasMany(
      sequelize.models["blog_article_and_label"],
      {
        foreignKey: {
          field: "article_label_id",
        },
      }
    );
    sequelize.models["blog_article_and_label"].belongsTo(
      sequelize.models["blog_article_label"],
      {
        foreignKey: {
          field: "id",
        },
      }
    );
    // 标签连接表与文章表的链接
    sequelize.models["blog_article"].hasMany(
      sequelize.models["blog_article_and_label"],
      {
        foreignKey: {
          field: "article_id",
        },
        as: "labels",
      }
    );
    sequelize.models["blog_article_and_label"].belongsTo(
      sequelize.models["blog_article_label"],
      {
        foreignKey: {
          field: "id",
        },
        as: "labels",
      }
    );
  });
};
