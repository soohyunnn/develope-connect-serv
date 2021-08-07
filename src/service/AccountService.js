import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import axios from "axios";
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const axios = require("axios");

const MAILURL = process.env.MAIL_URL;

//토큰 발급
const getToken = (data) => {
  const token = jwt.sign(
    {
      userId: data.userId,
      name: data.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m", // 1분
      issuer: "토큰발급자",
    }
  );
  return token;
};

/**
 * 이메일 회원가입
 * @param {*} req
 * @param {*} res
 */
export const emailJoin = async (req, res) => {
  try {
    logger.info(`req : ${JSON.stringify(req)}`);

    //http://13.125.60.249:5000/mail
    //이메일 인증 전송
    const result = await axios.post(MAILURL, {
      mail: req.email,
      type: "email",
    });
    return result.data;
    // logger.info(`email send result :  ${JSON.stringify(result)}`);
  } catch (e) {
    console.log("e", e);
    logger.error(`error :  ${JSON.stringify(e)}`);
  }
};

/**
 * 이메일 인증 후 확인 + 회원가입
 * @param {*} req
 * @param {*} res
 */
export const emailJoinCheck = async (req, res) => {
  try {
    console.log("req", req);

    const result = await models.Account.create({
      userId: req.userId,
      password: req.password,
      email: req.email,
      serviceAgree: true,
      informationAgree: true,
      status: false,
      restStatus: false,
      certification: false,
      activate: true,
      imageId: [613],
      representativeImage: 613,
    });
    logger.info(`account 회원가입 완료 : ${JSON.stringify(result.dataValues)}`);
    if (result != null) {
      const mailResult = await axios.post(MAILURL, {
        userId: req.userId,
        mail: req.email,
        createdAt: result.dataValues.createdAt,
        type: "join",
      });
      return result.dataValues;
    } else {
      const e = new Error("Server Error");
      e.status = 500;
      e.message = "Server Error";
      throw e;
    }
  } catch (e) {
    console.log("e", e);
    logger.error(`error :  ${JSON.stringify(e)}`);
  }
};

/**
 * 이메일 추가 등록시 회원정보에 이메일 정보 추가
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const emailCheck = async (req, res) => {
  try {
    const resultAccount = await models.Account.update(
      {
        email: req.email,
      },
      {
        where: {
          id: req.userId,
        },
      }
    );
    if (resultAccount == 1) {
      return "success";
    }
  } catch (e) {
    logger.info(`AccountService - emailCheck : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 회원 가입(유저 등록)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const create = async (req, res) => {
  try {
    const users = await models.Account.findOne({
      where: { userId: req.userId },
    });

    if (users != null) {
      if (req.kakao != null) {
        const result = await models.Account.update(
          {
            kakao: req.kakao,
            name: req.name,
          },
          {
            where: { userId: users.userId },
          }
        );
        const { data } = await findByKakaoEmail(eq.kakao);
        const token = getToken(data);
        return { token: token };
      }
      if (req.facebook != null) {
        const result = await models.Account.update(
          {
            facebook: req.facebook,
            name: req.name,
          },
          {
            where: { userId: users.userId },
          }
        );
        const { data } = await findByFacebookEmail(req.facebook);
        const token = getToken(data);
        return { token: token };
      }
      if (req.naver != null) {
        const result = await models.Account.update(
          {
            naver: req.naver,
            name: req.name,
          },
          {
            where: { userId: users.userId },
          }
        );
        const { data } = await findByNaverEmail(req.naver);
        const token = getToken(data);
        return { token: token };
      }
      if (req.google != null) {
        const result = await models.Account.update(
          {
            google: req.google,
            name: req.name,
          },
          {
            where: { userId: users.userId },
          }
        );
        const { data } = await findByGoogleEmail(req.google);
        const token = getToken(data);
        return { token: token };
      }
      if (req.apple != null) {
        const result = await models.Account.update(
          {
            apple: req.apple,
            name: req.name,
          },
          {
            where: { userId: users.userId },
          }
        );
        const { data } = await findByAppleEmail(req.apple);
        const token = getToken(data);
        return { token: token };
      }
    }

    if (users == null) {
      const result = await models.Account.create({
        userId: req.userId,
        password: bcrypt.hashSync(req.password, 10),
        email: req.email,
        name: req.name,
        serviceAgree: req.serviceAgree,
        informationAgree: req.informationAgree,
        kakao: req.kakao,
        naver: req.naver,
        facebook: req.facebook,
        google: req.google,
        apple: req.apple,
        status: false,
        restStatus: false,
        certification: false,
        activate: true,
        imageId: [613],
        representativeImage: 613,
      });
      logger.info(`result :  ${JSON.stringify(result.dataValues)}`);

      //TODO 로직 수정 필요
      if (result != null) {
        const resultMail = await axios.post(MAILURL, {
          mail: req.email,
          type: "join",
        });
        if (resultMail.msg == "success") {
          const token = getToken(result);
          return { token: token };
        }

        //회원가입 성공시 관리자 레터 전송
        const resultSendLetter = await axios.post(
          "http://13.125.60.249:5000/api/letter",
          {
            senderId: 119,
            recipientId: result.dataValues.id,
            title: "안녕하세요. CHEERS 관리자입니다.",
            content:
              "CHEERS 사용자 앱을 이용해 주셔서 감사합니다. CHEERS는 크리에이터와 팬 간의 진정 어린 소통과 응원을 위한 레터 서비스를 제공합니다. 크리에이터와 직접 레터를 주고 받거나 다른 사용자들의 레터를 보고 응원의 댓글을 남겨보세요. 레터 발송, 댓글, 좋아요, 공유하기 모두 크리에이터에게 큰 힘이 됩니다.",
            paymentAmount: 0,
            fileIds: [1],
            hashtag: ["CHEERS"],
            status: true,
            saveState: true,
            type: "LETTER",
          }
        );
        console.log("resultSendLetter", resultSendLetter);
        return "success";
      } else {
        const e = new Error("Server Error");
        e.status = 500;
        e.message = "Server Error";
        throw e;
      }
    }
  } catch (e) {
    logger.error(`AccountService - create : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 회원 목록 조회
 * @param {*} params
 * @param {*} res
 * @returns
 */
export const findAll = async (params, res) => {
  console.log("req", params);
  const where = {};

  if (params?.userId) {
    where.userId = { [Op.like]: "%" + params.userId + "%" };
    // where.userId = "%" + params.userId + "%";
  }
  if (params?.name) {
    where.name = { [Op.like]: "%" + params.name + "%" };
  }
  if (params?.email) {
    where.email = { [Op.like]: "%" + params.email + "%" };
  }

  try {
    const results = await models.Account.findAll({
      raw: true,
      where: where,
    });

    const data = results.map((d) => {
      // console.log("ddd", d.email);
      let accountList = {};
      return (accountList = {
        id: d.id,
        userId: d.userId,
        name: d.name,
        email: d.email,
        bankName: d.bankName,
        accountNumber: d.accountNumber,
        kakao: d.kakao,
        naver: d.naver,
        facebook: d.facebook,
        google: d.google,
        apple: d.apple,
        createdAt: d.createdAt,
        restStatus: d.restStatus,
        certification: d.certification,
      });
    });
    logger.info("account", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const update = async (params, req, res) => {
  console.log("req", params, req);
  console.log("aaa", req.password);
  try {
    const result = await models.Account.update(
      {
        //데이터
        password: req.password,
      },
      {
        // 조건
        where: { id: params.id },
      }
    );
    return "200";
  } catch (e) {
    console.log(e);
  }
};

/**
 * 인스타 SNS 연동
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const instagramAccountupdate = async (params, req, res) => {
  try {
    const result = await models.Account.update(
      {
        //데이터
        instagramAccount: req.instagramAccount,
      },
      {
        // 조건
        where: { id: params.id },
      }
    );
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 페이스북 SNS 연동
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const facebookAccountupdate = async (params, req, res) => {
  try {
    const result = await models.Account.update(
      {
        //데이터
        facebookAccount: req.facebookAccount,
      },
      {
        // 조건
        where: { id: params.id },
      }
    );
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 유튜브 SNS 연동
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const youtubeAccountupdate = async (params, req, res) => {
  try {
    const result = await models.Account.update(
      {
        //데이터
        youtubeAccount: req.youtubeAccount,
      },
      {
        // 조건
        where: { id: params.id },
      }
    );
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 유저 상세
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const datail = async (params, req, res) => {
  try {
    logger.info(
      `params :  ${JSON.stringify(params)} , req : ${JSON.stringify(req)}`
    );
    let fanYn = false;

    //해당 유저의 팬 수 조회
    const subscribeList = await models.Subscribe.findAll({
      raw: true,
      where: { ranker_id: params.id },
    });

    // console.log("size", subscribeList);

    //로그인 한 사용자가 조회한 회원의 팬인지 여부 확인
    if (subscribeList.length != 0) {
      subscribeList.map((d) => {
        if (d.subscriber_id == req.userId) {
          fanYn = true;
        }
      });
    }

    //받은 레터 조회
    const letterList = await models.Letter.findAll({
      where: { recipient_id: params.id },
    });

    //답변한 레터 조회
    const replyList = await models.Reply.findAll({
      where: { sender_id: params.id },
    });

    const letterReplyCount = replyList.length / letterList.length;

    // console.log("letterList", letterList.length);
    // console.log("replyList", replyList.length);

    //좋아요 수
    const likeCount = await models.LetterLikes.findAll({
      raw: true,
      where: {
        [Op.or]: [
          {
            [Op.and]: {
              letter_sender_id: params.id,
            },
          },
          {
            [Op.and]: {
              letter_recipient_id: params.id,
            },
          },
        ],
      },
    });

    const result = await models.Account.findOne({
      where: { id: params.id },
    });

    return {
      id: result.dataValues.id,
      userId: result.dataValues.userId,
      name: result.dataValues.name,
      email: result.dataValues.email,
      restStatus: result.dataValues.restStatus,
      fanCount: subscribeList.length,
      fanYn: fanYn,
      statusMessage: result.dataValues.statusMessage,
      imageId: result.dataValues.imageId,
      likeCount: likeCount.length,
      letterReplyCount: letterReplyCount,
      instagramAccount: result.dataValues.instagramAccount,
      facebookAccount: result.dataValues.facebookAccount,
      youtubeAccount: result.dataValues.youtubeAccount,
      certification: result.dataValues.certification,
    };
  } catch (e) {
    console.log(e);
  }
};

//TODO 완전히 삭제가 맞는지.. 아님 다른 테이블에 따로 다시 저장해 두는지 확인 필요
/**
 * 회원 탈퇴
 * @param {*} params
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const secession = async (params, req, res) => {
  console.log("req", params, req);
  try {
    const user = await models.Account.findOne({
      where: { id: params.id },
    });
    console.log("user", user.dataValues);

    const result = await models.Account.destroy({
      where: { id: params.id },
    });

    if (result != null) {
      const createAccountSecession = await models.AccountSecession.create({
        userId: user.dataValues.userId,
        password: user.dataValues.password,
        email: user.dataValues.email,
        name: user.dataValues.name,
        serviceAgree: user.dataValues.serviceAgree,
        informationAgree: user.dataValues.informationAgree,
        kakao: user.dataValues.kakao,
        naver: user.dataValues.naver,
        facebook: user.dataValues.facebook,
        google: user.dataValues.google,
        apple: user.dataValues.apple,
        status: user.dataValues.status,
        restStatus: user.dataValues.restStatus,
        reasonForWithdrawal: req.reasonForWithdrawal,
        joinAt: user.dataValues.createdAt,
      });
      if (createAccountSecession != null) {
        const result = await axios.post(MAILURL, {
          userId: createAccountSecession.dataValues.userId,
          createdAt: createAccountSecession.dataValues.createdAt,
          mail: createAccountSecession.dataValues.email,
          type: "secession",
        });
        return "200";
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const findByUserID = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { userId: req.userId },
    });
    return { data: result._previousDataValues };
  } catch (e) {
    console.log(e);
  }
};

export const findByEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne(
      // {
      //   //데이터
      //   password: req.password,
      // },
      {
        // 조건
        where: { email: req.email },
      }
    );
    return { data: result._previousDataValues };
  } catch (e) {
    console.log(e);
  }
};

export const findByKakaoEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { kakao: req },
    });
    return { data: result };
  } catch (e) {
    console.log(e);
  }
};

export const findByNaverEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { naver: req },
    });
    return { data: result };
  } catch (e) {
    console.log(e);
  }
};

export const findByFacebookEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { facebook: req },
    });
    return { data: result };
  } catch (e) {
    console.log(e);
  }
};

export const findByGoogleEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { google: req },
    });
    return { data: result };
  } catch (e) {
    console.log(e);
  }
};

export const findByAppleEmail = async (req, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { apple: req },
    });
    return { data: result };
  } catch (e) {
    console.log(e);
  }
};

/**
 * 회원 수정
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const updateAccount = async (req, body, res) => {
  try {
    console.log("req", req);
    console.log("body", body);

    // let data = {};
    // if(body.letterType == 'SEND') {
    //   data = {sent_delete_yn : true}
    // }

    // if(body.letterType == 'RECEIVE') {
    //   data = {received_delete_yn : true}
    // }

    //해당 레터 좋아요 카운터 수 올리기
    const result = await models.Account.update(
      {
        //데이터
        name: body.name,
        statusMessage: body.statusMessage,
        imageId: body.imageId,
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    if (result == 1) {
      return "200";
    }
    // return result.dataValues;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 이메일 수정
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const updateAccountEmail = async (req, body, res) => {
  try {
    const result = await models.Account.update(
      {
        //데이터
        email: body.email,
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 비밀번호 체크
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const checkPassword = async (req, body, res) => {
  console.log("req", req);
  try {
    const result = await models.Account.findOne({
      // 조건
      where: { id: req.userId },
    });

    const checkYn = await bcrypt.compare(
      req.password,
      result.dataValues.password
    );
    console.log("checkYn", checkYn);

    return checkYn;
  } catch (e) {
    console.log(e);
  }
};

/**
 * 비밀번호 수정
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const updateAccountPassword = async (req, body, res) => {
  try {
    //토큰 확인
    console.log("req", req);
    const decode = jwt.decode(req.accessToken, process.env.JWT_SECRET);
    const { data } = await findByUserID(decode);

    if (data != null) {
      const result = await models.Account.update(
        {
          //데이터
          password: bcrypt.hashSync(req.password, 10),
        },
        {
          // 조건
          where: { id: data.id },
        }
      );
      if (result == 1) {
        return "200";
      }
    }
  } catch (e) {
    console.log(e);
  }
};

/**
 * 회원 등록된 이미지 삭제
 * @param {*} req
 * @param {*} body
 * @param {*} res
 */
export const deleteImageId = async (req, body, res) => {
  try {
    const account = await models.Account.findOne({
      // 조건
      where: { id: req.userId },
    });

    const imageIdList = account.dataValues.imageId;

    const resultData = imageIdList.filter((d) => d !== req.imageId);
    // console.log("imageIdList ::", imageIdList);
    // console.log("resultData", resultData);

    const result = await models.Account.update(
      {
        //데이터
        imageId: resultData,
      },
      {
        // 조건
        where: { id: req.userId },
      }
    );
    if (result == 1) {
      return "200";
    }
  } catch (e) {
    logger.error(e);
    console.log(e);
  }
};

/**
 * 대표 이미지 설정
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const representativeImageSetup = async (req, body, res) => {
  try {
    logger.info(
      `AccountService - representativeImageSetup => req : ${JSON.stringify(
        req
      )}, body : ${JSON.stringify(body)}`
    );

    const users = await models.Account.findOne({
      where: { id: req.id },
    });
    let arr = new Array();

    if (users != null) {
      arr = users.dataValues.imageId;
    }

    if (!arr.includes(body.representativeImage)) {
      const e = new Error("Not Fount Recode");
      e.status = 404;
      e.message = "Not Fount Recode";
      throw e;
    }

    let deleteArr = arr.filter((d) => d != body.representativeImage);
    deleteArr.unshift(body.representativeImage);

    const result = await models.Account.update(
      {
        //데이터
        representativeImage: body.representativeImage,
        imageId: deleteArr,
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    if (result == 1) {
      return "success";
    }
  } catch (e) {
    throw e;
  }
};

/**
 * 회원 이미지 등록
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const saveImages = async (req, body, res) => {
  try {
    const users = await models.Account.findOne({
      where: { id: req.id },
    });
    console.log(
      "users.dataValues.imageId.length",
      users.dataValues.imageId.length
    );
    let arr = new Array();
    if (users != null) {
      if (users.dataValues.imageId.length === 10) {
        // throw new Error("10개 이상 등록이 불가능합니다.");

        const e = new Error("More Than 10");
        e.status = 400;
        e.message = "Server Error";
        throw e;
      }
      arr = users.dataValues.imageId;
    }
    if (body.imageId !== null) {
      arr.unshift(body.imageId);
    }
    const result = await models.Account.update(
      {
        //데이터
        imageId: arr,
        representativeImage: body.imageId, //추가한 이미지로 대표이미지로 설정
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    if (result == 1) {
      return {
        data: null,
        msg: "success",
      };
    } else {
      const e = new Error("Server Error");
      e.status = 500;
      e.message = "Server Error";
      throw e;
    }
  } catch (e) {
    logger.error(`AccountService - saveImages : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 회원 프로필 이미지 삭제
 * @param {*} req
 * @param {*} body
 * @param {*} res
 * @returns
 */
export const deleteImage = async (req, body, res) => {
  logger.info(
    `AccountService - deleteImage => req : ${JSON.stringify(
      req
    )} , body : ${JSON.stringify(body)} `
  );

  try {
    const users = await models.Account.findOne({
      where: { id: req.id },
    });

    let arr = new Array();
    let changeImageId;
    if (users != null) {
      arr = users.dataValues.imageId;
    }

    if (!arr.includes(body.imageId)) {
      throw new Error("Not Fount Recode");
    }

    let deleteArr = arr.filter((d) => d != body.imageId);

    if (users.dataValues.representativeImage == body.imageId) {
      changeImageId = deleteArr[0];
    } else {
      changeImageId = users.dataValues.imageId;
    }

    const result = await models.Account.update(
      {
        //데이터
        imageId: deleteArr,
        representativeImage: changeImageId,
      },
      {
        // 조건
        where: { id: req.id },
      }
    );
    if (result == 1) {
      return "success";
    }
  } catch (error) {
    logger.error(error);
  }
};

/**
 * 푸시 알람/방해금지모두 상태 조회(리스트)
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const pushStatusList = async (req, res, next) => {
  try {
    const users = await models.Account.findOne({
      where: { id: req.id },
    });
    let doNotDisturbStartTime;
    let doNotDisturbEndTime;
    if (users.dataValues.doNotDisturbStartTime == null) {
      doNotDisturbStartTime = "21:00:00";
      doNotDisturbEndTime = "10:30:00";
    } else {
      doNotDisturbStartTime = users.dataValues.doNotDisturbStartTime;
      doNotDisturbEndTime = users.dataValues.doNotDisturbEndTime;
    }

    return {
      receiveNewLetterYn: users.dataValues.receiveNewLetterYn,
      receiveReplyYn: users.dataValues.receiveReplyYn,
      commentNotificationsYn: users.dataValues.commentNotificationsYn,
      likeNotificationsYn: users.dataValues.likeNotificationsYn,
      doNotDisturbYn: users.dataValues.doNotDisturbYn,
      doNotDisturbStartTime: doNotDisturbStartTime,
      doNotDisturbEndTime: doNotDisturbEndTime,
    };
  } catch (e) {
    logger.error(`AccountService - pushStatusList :  ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 푸시 알람/방해금지모드 업데이트
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const pushStatusUpdate = async (req, body, res, next) => {
  try {
    console.log("aaaa", req);
    console.log("bbbb", body);
    let state = {};
    if (body.type == "receiveNewLetter") {
      state = { receiveNewLetterYn: body.status };
    }
    if (body.type == "receiveReply") {
      state = { receiveReplyYn: body.status };
    }
    if (body.type == "commentNotifications") {
      state = { commentNotificationsYn: body.status };
    }
    if (body.type == "likeNotifications") {
      state = { likeNotificationsYn: body.status };
    }
    if (body.type == "doNotDisturb") {
      state = { doNotDisturbYn: body.status };
    }
    logger.info(`state : ${JSON.stringify(state)}`);
    const result = await models.Account.update(state, {
      where: { id: req.id },
    });
    if (result == 1) {
      return "sucess";
    }
  } catch (e) {
    logger.error(`AccountService - pushStatusUpdate : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 방해금지모드 시간대 설정
 * @param {*} req
 * @param {*} body
 * @returns
 */
export const setDoNotDisturbTime = async (param, body) => {
  try {
    const result = await models.Account.update(
      {
        doNotDisturbStartTime: body.doNotDisturbStartTime,
        doNotDisturbEndTime: body.doNotDisturbEndTime,
        doNotDisturbYn: true,
      },
      {
        where: { id: param.id },
      }
    );
    if (result == 1) {
      return "sucess";
    }
  } catch (e) {
    logger.error(`AccountService - pushStatusUpdate : ${JSON.stringify(e)}`);
    throw e;
  }
};

/**
 * 휴면설정
 * @param {*} param
 * @param {*} body
 * @returns
 */
export const changeDormancy = async (param, body) => {
  try {
    const result = await models.Account.update(
      {
        restStatus: true,
      },
      {
        where: { id: param.id },
      }
    );
    if (result == 1) {
      return "Success";
    }
  } catch (e) {
    logger.error(`AccountService - changeDormancy : ${JSON.stringify(e)}`);
    throw e;
  }
};

export default {
  findAll,
  create,
  update,
  secession,
  findByUserID,
  findByEmail,
  datail,
  findByKakaoEmail,
  findByNaverEmail,
  findByFacebookEmail,
  findByGoogleEmail,
  findByAppleEmail,
  instagramAccountupdate,
  facebookAccountupdate,
  youtubeAccountupdate,
  updateAccount,
  updateAccountEmail,
  checkPassword,
  updateAccountPassword,
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
};
