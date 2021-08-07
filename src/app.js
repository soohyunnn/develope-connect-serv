import express from "express";
import models from "./models";
import swaggerUi from "swagger-ui-express";
import { getThumbnail } from "./controllers/file/ffmpeg.js";
import { logger } from "./config/winston.js";
import swaggerDocument from "./modules/swaggerDoc.js";
import sequelize from "./models";
import nunjucks from "nunjucks";
import tokenRouter from "./config/jwt/token";
import email from "./common/auth";
import path, { resolve } from "path";
import admin from "firebase-admin";
import serviceAccount from "./cheers-1904e-firebase-adminsdk-95nfu-b853e7916b.json";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import session from "express-session";
import controller from "./controllers";
import send from "./controllers/push/firebaePush";
import { Op } from "sequelize";
import { rejects } from "assert";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//다중 서버 접속에 대한 문제를 해결해주는 기능 cors
// var cors = require("cors");

/**
 * Multer 미들웨어는 파일 업로드를 위해 사용되는 multipart/form-data에서 사용된다.
 * 다른 폼으로 데이터를 전송하면 적용이 안된다.
 * Header의 명시해서 보내주는게 좋다.
 */
// 파일 업로드용 미들웨어
// var multer = require("multer");
// var fs = require("fs");

// const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "secretWords",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 30, // 쿠키 유효기간 30분
    },
  })
);

console.log("dirname", __dirname);
app.use("/public", express.static(__dirname + "public"));

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

const fileFilter = (req, file, callback) => {
  const typeArray = file.mimetype.split("/");

  const fileType = typeArray[1]; // 이미지 확장자 추출

  //이미지 확장자 구분 검사
  if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
    callback(null, true);
  } else {
    return callback(
      { message: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다." },
      false
    );
  }
};

//파일명, 파일경로를 변경해주고자 할 때(파일명 뒤에 확장자 붙임!)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 파일이 업로드될 경로 설정
    cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    // timestamp를 이용해 새로운 파일명 설정
    let newFileName = new Date().valueOf() + path.extname(file.originalname);
    let type = file.mimetype.split("/")[1];
    logger.info(`originalname ${JSON.stringify(file)}`);
    // console.log("type", type);
    if (type === "jpeg" || type === "png" || type === "jpg") {
      let newFileName1 =
        file.originalname.split(".")[0] +
        "_" +
        newFileName.split(".")[0] +
        ".png";
      // console.log("newFileName", newFileName);
      cb(null, newFileName1);
    } else {
      let newFileName1 =
        file.originalname.split(".")[0] +
        "_" +
        newFileName.split(".")[0] +
        ".mp4";
      // console.log("newFileName", newFileName);
      cb(null, newFileName1);
    }
  },
});
const upload = multer({ storage: storage });

//파일을 저장할 디렉토리 설정 (현재 위치에 uploads라는 폴더가 생성되고 하위에 파일이 생성된다.)
// const upload = multer({
//   dest: __dirname+'/uploads/', // 이미지 업로드 경로
//   limits: limits, // 이미지 업로드 제한 설정
//   fileFilter : fileFilter // 이미지 업로드 필터링 설정
// })

//다중 서버 접속 문제를 해결해주는 cors을 미들웨어에 등록
app.use(cors());

//푸시알람
app.get("/pushSend", async (req, res, next) => {
  logger.info(`푸시알람 req : ${JSON.stringify(req.query)}`);
  if (req.query.type == "newLetter") {
    //신규레터 수신동의한 사람만 조회
    push1(req.query).then((d) => {
      res.status(200).json({ success: true });
    });
  }
  if (req.query.type == "receiveReply") {
    //답장수신 수신동의한 사람만 조회
    await push1(req.query).then((d) => {
      res.status(200).json({ success: true });
    });
  }
  if (req.query.type == "commentNotifications") {
    //댓글 알림 수신동의한 사람만 조회
    await push1(req.query).then((d) => {
      res.status(200).json({ success: true });
    });
  }
  if (req.query.type == "likeNotifications") {
    //좋아요 알림 수신동의한 사람만 조회
    await push1(req.query).then((d) => {
      res.status(200).json({ success: true });
    });
  }
});

const push1 = async (req) => {
  let tokenList = new Array();
  let arr = new Array();
  const where = {};

  //신규레터
  if (req.type == "newLetter") {
    where.receiveNewLetterYn = {
      [Op.eq]: true,
    };
  }

  //답장수신
  if (req.type == "receiveReply") {
    where.receiveReplyYn = {
      [Op.eq]: true,
    };
  }

  //댓글알림
  if (req.type == "commentNotifications") {
    where.commentNotificationsYn = {
      [Op.eq]: true,
    };
  }

  //좋아요알림
  if (req.type == "likeNotifications") {
    where.likeNotificationsYn = {
      [Op.eq]: true,
    };
  }

  const resultAccount = await models.Account.findAll({
    where: where,
  }).then((accountData) => {
    accountData.map((d) => {
      logger.info(`accountData : ${JSON.stringify(d)}`);
      const now = new Date();
      const nowTime =
        now.getHours() + "" + now.getMinutes() + "" + now.getSeconds();
      //방해금지시간이 아닐경우
      logger.info(`현재시간 시분초 :  ${nowTime}`);
      if (
        d.doNotDisturbStartTime > nowTime &&
        !d.doNotDisturbEndTime < nowTime
      ) {
        console.log("방해금지시간 아님!!!");
        arr.push(d.id);
      }
    });
    logger.info(`arr : ${JSON.stringify(arr)}`);
    const resultAccountDevice = models.AccountDevice.findAll({
      where: { user_id: arr },
    }).then((accountDeviceData) => {
      logger.info(`resultAccountDevice : ${JSON.stringify(accountDeviceData)}`);
      accountDeviceData.map((dv) => {
        tokenList.push(dv.device_token);
      });
      logger.info(`tokenList : ${JSON.stringify(tokenList)}`);
      const resultMessage = push(tokenList, req.title, req.message)
        .then((d) => {
          arr.map((a) => {
            const account = models.Push.create({
              title: req.title,
              content: req.message,
              user_id: a,
              read_yn: false,
            });
            logger.info(`push DB : ${JSON.stringify(account.dataValues)}`);
          });
        })
        .catch((e) => {
          console.log("error", e);
          throw e;
        });
    });
  });
};

const push = async (tokenList, title, message) => {
  let target_token_list = tokenList;
  const mapTest = await Promise.all(
    target_token_list.map((t) => {
      let message = {
        notification: {
          title: title,
          body: message,
        },
        token: t,
      };

      return admin
        .messaging()
        .send(message)
        .then((response) => {
          logger.info(
            `Successfully sent message: :  ${JSON.stringify(response)}`
          );
          return Promise.resolve("success");
        })
        .catch(function (err) {
          console.log("Error Sending message!!! : ", err);
          return Promise.resolve("fail");
        });
    })
  );
  // console.log("mapTest", mapTest);
  return mapTest;
};

app.post("/single/upload", upload.single("file"), (req, res, next) => {
  const { mimetype, destination, filename, path, size } = req.file;
  const { name } = req.body;
  const type = mimetype.split("/")[1];
  logger.info(`upload file : ${JSON.stringify(req.file)}`);

  //이미지 일 경우
  if (type === "jpeg" || type === "png" || type === "jpg") {
    const insertFile = async () => {
      return await models.Files.create({
        content_type: mimetype,
        extension: mimetype.split("/")[1],
        filename: filename,
        path: path,
        size: size,
      });
    };

    insertFile().then((d) => {
      res.json({ ok: true, data: d.dataValues });
    });
  } else {
    const result = getThumbnail(path);

    filename.split(".")[0];

    const thumbnailInsertFile = async () => {
      return await models.Files.create({
        content_type: "image/png",
        extension: "png",
        filename: "thumbnail-" + filename.split(".")[0] + ".png",
        path:
          "../uploads/thumbnails/thumbnail-" + filename.split(".")[0] + ".png",
        size: size,
      });
    };

    thumbnailInsertFile().then((d) => {
      const insertFile = async () => {
        return await models.Files.create({
          content_type: "video/mp4",
          extension: mimetype.split("/")[1],
          filename: filename,
          path: path,
          size: size,
          thumbnailId: d.dataValues.id,
        });
      };

      insertFile().then((d) => {
        res.json({ ok: true, data: d.dataValues });
      });
    });
  }
});

app.get("/download", function (req, res) {
  // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
  // id를 사용해 데이터를 찾음
  const result = async () => {
    return await models.Files.findOne({
      where: { id: req.query.id },
    });
  };

  result()
    .then((d) => {
      if (d != null) {
        var filePath = d.dataValues.path;
        var fileName = d.dataValues.filename;
        const fireExistCheck = fs.existsSync(filePath);
        if (fireExistCheck) {
          var fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);
          res.setHeader(
            "Content-Disposition",
            "attachment;filename=" + encodeURI(fileName)
          );

          if (
            d.extension === "jpeg" ||
            d.extension === "png" ||
            d.extension === "jpg"
          ) {
            res.setHeader("Content-Type", "image/png");
          } else {
            res.setHeader("Content-type", "video/mp4");
          }
        } else {
          res.status(404).send("Not Fount File");
        }
      } else {
        res.json({ status: "404" });
      }
    })
    .catch((e) => {
      res.status(404).send("Not Fount Recoder");
    });
});

// DB authentication
sequelize.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .then(() => {
    console.log("DB Sync complete.");
    return sequelize.sequelize.sync(); //sync 로그가 계속 떠서 주석처리!
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const port = 7000;

app.get("/", (req, res) => {
  // logger.info("GET /");
  res.sendStatus(200);
});

app.get("/error", (req, res) => {
  logger.error("Error message");
  res.sendStatus(500);
});

app.get("/", (req, res) => {
  res.send("hello express");
});

nunjucks.configure("template", {
  autoescape: true,
  express: app,
});

app.set("view engine", "html");

//Express에서 post호출 시 request의 body에서 undefined가 발생 => (res.body - undefiend 나오는 문제 해결)
app.use(express.json());

app.use(controller);

//swagger 연결설정
app.use("/swagger-ui.html", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/token", tokenRouter);
// app.use("/api", apiRouter);

app.use("/mail", email);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, function () {
  logger.info(`Server listening on port ${port}`);
  console.log("Express listening on port", port);
});
