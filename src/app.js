import express from "express";
import models from "./models";
import swaggerUi from "swagger-ui-express";
import { logger } from "./config/winston.js";
import swaggerDocument from "./modules/swaggerDoc.js";
import sequelize from "./models";
import nunjucks from "nunjucks";
import tokenRouter from "./config/jwt/token";
import email from "./common/auth";
import admin from "firebase-admin";
import serviceAccount from "./cheers-1904e-firebase-adminsdk-95nfu-b853e7916b.json";
import cors from "cors";
import session from "express-session";
import controller from "./controllers";
import { Op } from "sequelize";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

app.use("/mail", email);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, function () {
  logger.info(`Server listening on port ${port}`);
  console.log("Express listening on port", port);
});
