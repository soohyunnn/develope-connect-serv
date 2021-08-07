import Sequelize from "sequelize";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

// var Sequelize = require("sequelize");
// var path = require("path");
// var fs = require("fs");
// var dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    timezone: "+09:00", //한국 시간 셋팅
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

let db = [];

//index.js 파일을 제외한 모든 파일을 참조하여 테이불둘울 생성해주는 명령어(아래)
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

//외부키가 걸린 테이블애 대해서도 자동 생성
Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
