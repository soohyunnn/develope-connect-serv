import models from "../models/index.js";
import express from "express";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import moment from "moment-timezone";
import { logger } from "../config/winston.js";
import jwt from "jsonwebtoken";

// const express = require("express");
const router = express.Router();
// const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const path = require("path");
// const moment = require("moment-timezone");
// const { logger } = require("../config/winston");
// const jwt = require("jsonwebtoken");
var appDir = path.dirname(require.main.filename);

router.post("/", async (req, res) => {
  logger.info(`Mail Post :  ${JSON.stringify(req.body)}`);

  const users = await models.Account.findOne({
    where: { email: req.body.mail },
  });

  let authNum = Math.random().toString().substr(2, 6);
  let emailTemplete;
  let title;
  let message;
  let subTitle;
  let codeTitle;
  let codeTitle1;
  let codeTitle2;
  let link;
  let code;
  let code1;
  let code2;
  let file;
  req.session.code = authNum;

  //아이디 찾기
  if (req.body.type == "id") {
    title = "CHEERS 아이디 찾기 결과입니다";
    message =
      "안녕하세요. CHEERS입니다.\n회원님의 아이디를 확인해주세요. 감사합니다.";
    subTitle = "회원정보";
    codeTitle = "아이디";
    code = users.dataValues.userId;
    file = "id.ejs";
  }

  if (req.body.type == "password") {
    const token = jwt.sign(
      {
        userId: req.body.userId,
        name: req.body.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "300m", // 30분
        issuer: "토큰발급자",
      }
    );
    title = "CHEERS 비밀번호 재설정 안내 메일입니다. ";
    message =
      "안녕하세요. CHEERS입니다.\n유효시간 내 아래 버튼을 클릭하여 CHEERS 사용자앱에서 비밀번호를 재설정 해주세요. 감사합니다.";
    file = "password.ejs";
    link = "cheerslink://passwordReset/accessToken?" + token;
    req.session.token = token;
  }

  if (req.body.type == "join") {
    title = "CHEERS 회원가입을 축하합니다.";
    message =
      "반갑습니다 회원님!.\nCHEERS 회원가입을 환영합니다.\n\n\n 회원님의 가입 정보를 확인해주세요.";
    file = "join.ejs";
    subTitle = "회원정보";
    codeTitle = "아이디";
    if (req.body.socialType != undefined) {
      code = req.body.userId + "(" + req.body.socialType + ")";
    } else {
      code = req.body.userId;
    }
    codeTitle1 = "가입일시";
    code1 = req.body.createdAt;
  }

  if (req.body.type == "email" || req.type == "email") {
    title = "CHEERS 이메일 인증을 완료해주세요.";
    message =
      "안녕하세요. CHEERS입니다.\n유효시간 내 아래 버튼을 클릭하여 이메일 인증을 완료해주세요. 감사합니다.";
    file = "email.ejs";
    link = "cheerslink://code?" + authNum;
    req.session.email = req.body.mail;
    logger.info(`session : ${JSON.stringify(req.session)}`);
  }

  if (req.body.type == "secession" || req.type == "secession") {
    title = "CHEERS 탈퇴가 완료되었습니다.";
    message =
      "그동안 CHEERS를 이용해 주셔서 감사합니다.\n탈퇴 시 회원정보가 삭제되며 탈퇴 후 N개월 동안 재가입이 제한됩니다.";
    subTitle = "회원정보";
    codeTitle = "아이디";
    code = req.body.userId;
    codeTitle1 = "탈퇴일";
    code1 = req.body.createdAt;
    file = "secession.ejs";
  }

  if (req.body.type == "approval" || req.type == "approval") {
    title = "CHEERS 사용자 인증 요청이 승인되었습니다.";
    message = `안녕하세요.CHEERS입니다. \n
    사용자 인증 요청을 해주셔서 감사합니다.  \n
      ${req.body.userId}님의 사용자 인증 요청이 승인되었음을 알려드립니다. \n
      CHEERS 서비스를 통해 다양하고 유익한 활동을 기대합니다. 감사합니다.`;
    // message =
    //   "안녕하세요.CHEERS입니다" +
    //   "<br></br>" +
    //   "사용자 인증 요청을 해주셔서 감사합니다." +
    //   "<br></br>" +
    //   req.body.userId +
    //   "님의 사용자 인증 요청이 승인되었음을 알려드립니다." +
    //   "<br></br>" +
    //   "CHEERS 서비스를 통해 다양하고 유익한 활동을 기대합니다. 감사합니다.";
    subTitle = "상세정보";
    codeTitle = "아이디";
    code = req.body.userId;
    codeTitle1 = "승인일자";
    code1 = req.body.createdAt;
    file = "approval.ejs";
  }

  if (req.body.type == "reject" || req.type == "reject") {
    title = "CHEERS 사용자 인증 요청이 반려되었습니다.";
    message = `안녕하세요.CHEERS입니다. \n
    사용자 인증 요청을 해주셔서 감사합니다.  \n
      하지만 죄송하게도 ${req.body.userId}님의 사용자 인증 요청이 아래의 사유로 반려되었음을 알려드립니다. \n
      반려사유를 확인하신 후 내용을 보완하여 다시 요청해주세요. 감사합니다.`;
    // message =
    //   "안녕하세요.CHEERS입니다" +
    //   "<br></br>" +
    //   "사용자 인증 요청을 해주셔서 감사합니다." +
    //   "<br></br>" +
    //   req.body.userId +
    //   "님의 사용자 인증 요청이 승인되었음을 알려드립니다." +
    //   "<br></br>" +
    //   "CHEERS 서비스를 통해 다양하고 유익한 활동을 기대합니다. 감사합니다.";
    subTitle = "상세정보";
    codeTitle = "아이디";
    code = req.body.userId;
    codeTitle1 = "승인일자";
    code1 = req.body.createdAt;
    codeTitle2 = "반려사유";
    code2 = req.body.content;
    file = "reject.ejs";
  }

  req.session.code = authNum;
  ejs.renderFile(
    appDir + "/template/" + file,
    {
      title,
      message,
      code,
      codeTitle,
      subTitle,
      codeTitle1,
      code1,
      codeTitle2,
      code2,
      date: moment().format("YYYY.MM.DD HH.mm"),
      baseUrl: __dirname.replace("/router", ""), //로고 이미지 기본 Url입력
      link: link, //인증하러 가는 프론트 url 주소 전달받아서 넣기
    },
    function (err, data) {
      if (err) {
        console.log(err);
      }
      emailTemplete = data;
    }
  );

  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "위에서 작성한 구글 계정@gmail.com",
    to: req.body.mail,
    subject: title,
    html: emailTemplete,
  };

  await smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      logger.error(`err ${JSON.stringify(error)}`);
      res.json({ msg: error });
    } else {
      // req.session.code = authNum;
      logger.info(`auth - session : ${JSON.stringify(req.session)}`);
      res.json({ msg: "sucess", code: authNum });
      return res;
    }
    smtpTransport.close();
  });
});

module.exports = router;
