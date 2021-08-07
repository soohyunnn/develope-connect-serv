import { logger } from "../../config/winston";
import {
  create,
  findAll,
  update,
  datail,
  secession,
  findByUserID,
  findByEmail,
  instagramAccountupdate,
  facebookAccountupdate,
  youtubeAccountupdate,
  updateAccount,
  updateAccountEmail,
  updateAccountPassword,
  checkPassword,
  deleteImageId,
  representativeImageSetup,
  saveImages,
  deleteImage,
  emailJoin,
  emailJoinCheck,
  pushStatusList,
  pushStatusUpdate,
  setDoNotDisturbTime,
  changeDormancy,
  emailCheck,
} from "../../service/AccountService";
import bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

export const request = {
  path: "/account",
  method: "post",
};

export const params = {
  path: {
    userId: { type: "string", description: "아이디" },
    name: { type: "string", description: "이름" },
    password: { type: "string", description: "비밀번호" },
  },
  query: {
    userId: { type: "string", description: "아이디" },
    name: { type: "string", description: "이름" },
    password: { type: "string", description: "비밀번호" },
  },
  body: {
    userId: { type: "string", description: "아이디" },
    name: { type: "string", description: "이름" },
    password: { type: "string", description: "비밀번호" },
    email: { type: "string", description: "이메일" },
    serviceAgree: { type: "boolean", description: "서비스 이용약관 동의" },
    informationAgree: {
      type: "boolean",
      description: "개인정보 수집 이용 동의",
    },
  },
  form: {},
};

export const execute = async (req, res, next) => {
  logger.info("회원 등록 시작");
  await create(req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(500).send("Server Error");
      // if (e.status == "400") {
      //   res.status(400).send("More Than 10");
      // }
      // if (e.status == "404") {
      //   res.status(404).send("NO");
      // }
      // if (e.status == "500") {
      //   res.status(500).send("Server Error");
      // }
    });
};

export const searchAccounts = async (req, res, next) => {
  logger.info(`회원 목록 조회 => ${JSON.stringify(req.query)}`);
  const result = await findAll(req.query);
  res.json(result);
};

export const datilsAccounts = async (req, res, next) => {
  logger.info("회원 상세 조회 시작");
  const result = await datail(req.params, req.query);
  res.json(result);
};

export const updateAccountInfo = async (req, res, next) => {
  logger.info("회원 수정");
  const result = await updateAccount(req.params, req.body);
  res.json(result);
};

export const updateAccounts = async (req, res, next) => {
  logger.info("비밀번호 수정");
  const result = await update(req.params, req.body);
  res.json(result);
};

export const secessionAccounts = async (req, res, next) => {
  logger.info("회원 탈퇴");
  const result = await secession(req.params, req.body);
  res.json(result);
};

export const idDuplicateCheck = async (req, res, next) => {
  logger.info("idDuplicateCheck => 아이디 중복 확인");
  const result = await findByUserID(req.params);
  //만약 있으면 에러
  if (result == null) {
    res.status(200).send();
  } else {
    res.status(404).send("AlreadyExistenceException Records. ");
  }
};

export const searchUserId = async (req, res, next) => {
  logger.info("searchUserId => 아이디 찾기");
  const result = await findByEmail(req.params);
  //만약 없으면 에러
  if (result != null) {
    res.status(200).send(result.data);
  } else {
    res.status(404).send("Not Found Data.");
  }
};

export const updateInstagramAccount = async (req, res, next) => {
  logger.info("인스타 계정 연동");
  const result = await instagramAccountupdate(req.params, req.body);
  res.json(result);
};

export const updateFacebookAccount = async (req, res, next) => {
  logger.info("페이스북 계정 연동");
  const result = await facebookAccountupdate(req.params, req.body);
  res.json(result);
};

export const updateYoutubeAccount = async (req, res, next) => {
  logger.info("유튜브 계정 연동");
  const result = await youtubeAccountupdate(req.params, req.body);
  res.json(result);
};

export const updateEmail = async (req, res, next) => {
  logger.info("회원 이메일 수정");
  const result = await updateAccountEmail(req.params, req.body);
  res.json(result);
};

export const updatePassword = async (req, res, next) => {
  logger.info("회원 비밀번호 수정");
  console.log("session", req.session);
  //token이 일치할 경우
  if (req.session.token == req.body.accessToken) {
    await updateAccountPassword(req.body)
      .then((d) => {
        console.log("d", d);
        res.status(200).send(d);
      })
      .catch((e) => {
        console.log("e", e);
        if (e.status == "400") {
          res.status(400).send("More Than 10");
        }
        if (e.status == "500") {
          res.status(500).send("Server Error");
        }
      });
  }
};

export const checkAccountPassword = async (req, res, next) => {
  logger.info("회원 비밀번호 확인");
  const result = await checkPassword(req.body);
  res.json(result);
};

export const deleteImageIdAccount = async (req, res, next) => {
  logger.info("회원 프로필 이미지 삭제");
  const result = await deleteImageId(req.body);
  if (result != null) {
    res.status(200).send(result.data);
  } else {
    res.status(404).send("Not Found Data.");
  }
};

export const accountImageSetup = async (req, res, next) => {
  logger.info(`회원 대표이미지 설정 ${req}`);
  representativeImageSetup(req.params, req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      if (e.status == "400") {
        res.status(400).send("More Than 10");
      }
      if (e.status == "404") {
        res.status(e.status).send("Not Fount Recod");
      }
      if (e.status == "500") {
        res.status(500).send("Server Error");
      }
    });
};

export const saveAccountImages = async (req, res, next) => {
  logger.info(
    `회원 프로필 이미지 저장 ${JSON.stringify(req.params)} + ${JSON.stringify(
      req.body
    )}`
  );
  if (
    (req.params == null || req.body == null || req,
    params == undefined || req.body == undefined)
  ) {
    res.status(400).send("Bad Request");
  }

  await saveImages(req.params, req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      if (e.status == "400") {
        res.status(400).send("More Than 10");
      }
      if (e.status == "500") {
        res.status(500).send("Server Error");
      }
    });
};

export const deleteAccountImage = async (req, res, next) => {
  logger.info(
    `회원 프로필 이미지 삭제 ${JSON.stringify(req.params)} + ${JSON.stringify(
      req.body
    )}`
  );

  deleteImage(req.params, req.body)
    .then((d) => {
      res.status(200).send(d.data);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const checkCode = async (req, res, next) => {
  logger.info(
    `인증번호 체크 ${JSON.stringify(req.session)} / req : ${JSON.stringify(
      req.query
    )} `
  );
  req.query.email = req.session.email;
  console.log("query", req.query);
  if (req && req.session && req.session.code) {
    if (req.session.code == req.query.code) {
      emailCheck(req.query)
        .then((d) => {
          res.status(200).send(d);
        })
        .catch((e) => {
          res.status(400).send(e);
        });
    } else {
      res.status(400).send("Code mismatch");
    }
  } else {
    res.status(400).send("Email not verified");
  }
};

export const emailUserJoin = async (req, res, next) => {
  logger.info(`회원정보 : ${JSON.stringify(req.body)}`);
  req.session.userId = req.body.userId;
  req.session.password = bcrypt.hashSync(req.body.password, 10);
  req.session.email = req.body.email;

  const result = await emailJoin(req.body);
  console.log("result", result);
  req.session.code = result.code;
  res.status(200).send(result);
};

export const emailUserJoinCheck = async (req, res, next) => {
  logger.info(`회원정보 이메일 인증 체크 : ${JSON.stringify(req.body)}`);

  req.body.userId = req.session.userId;
  req.body.password = req.session.password;
  req.body.email = req.session.email;
  logger.info(`session : ${JSON.stringify(req.session)}`);
  if (req.session.code == req.body.code) {
    const result = await emailJoinCheck(req.body);
    logger.info(`result  ${JSON.stringify(result)}`);
    if (result != null) {
      res.status(200).send(result.data);
    } else {
      res.status(404).send("Not Found Data.");
    }
  }
};

export const getPushList = async (req, res, next) => {
  logger.info(
    `푸시 알람/방해금지모두 상태 조회(리스트) : ${JSON.stringify(req.query)}`
  );
  pushStatusList(req.query)
    .then((d) => {
      logger.info(`getPushList - ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      logger.error(`getPushList - ${e}`);
      res.status(400).send("BAD REQUEST");
    });
};

export const updatePushStatus = async (req, res, next) => {
  logger.info(
    `푸시 알람/방해금지모드 업데이트 => params : ${JSON.stringify(
      req.params
    )} , body : ${JSON.stringify(req.body)}`
  );
  pushStatusUpdate(req.params, req.body)
    .then((d) => {
      logger.info(`getPushList - d`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const updateDoNotDisturbTime = async (req, res, next) => {
  logger.info(
    `방해금지모드 시간대 설정 => params : ${JSON.stringify(
      req.params
    )} , body : ${JSON.stringify(req.body)}`
  );
  setDoNotDisturbTime(req.params, req.body)
    .then((d) => {
      logger.info(`getPushList - d`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export const updateDormancy = async (req, res, next) => {
  logger.info(
    `휴면 설정 => params : ${JSON.stringify(
      req.params
    )} , body : ${JSON.stringify(req.body)}`
  );
  changeDormancy(req.params, req.body)
    .then((d) => {
      logger.info(`getPushList - d`);
      res.status(200).send(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export default {
  execute,
  searchAccounts,
  updateAccounts,
  datilsAccounts,
  secessionAccounts,
  idDuplicateCheck,
  searchUserId,
  updateInstagramAccount,
  updateFacebookAccount,
  updateYoutubeAccount,
  updateAccountInfo,
  updateEmail,
  updatePassword,
  checkAccountPassword,
  deleteImageIdAccount,
  accountImageSetup,
  saveAccountImages,
  deleteAccountImage,
  checkCode,
  emailUserJoin,
  emailUserJoinCheck,
  getPushList,
  updatePushStatus,
  updateDoNotDisturbTime,
  updateDormancy,
};
