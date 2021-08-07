/*** config/jwt/token.js ***/
import { findByUserID } from "../../service/AccountService";
import express from "express";
import jwt from "jsonwebtoken";
import env from "dotenv";
import { verifyToken } from "./middlewares.js";
// const express = require("express");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
env.config();

// const { verifyToken } = require("./middlewares");

const router = express.Router();

// 토큰을 발급하는 라우터
router.post("/", async (req, res) => {
  try {
    // 대충 DB에서 사용자 정보를 찾는 코드: 대충 id, nick 정보를 찾았다고 가정
    // API 키를 발급하여 사용하면 좋음(?)
    console.log(req.body);
    const { data } = await findByUserID(req.body);
    console.log("data", data);
    const userId = data.userId;
    const name = data.name;

    if (data.status == true) {
      res.status(404).send("Not Found Recode");
    }

    // jwt.sign() 메소드: 토큰 발급
    const token = jwt.sign(
      {
        userId: userId,
        name: name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "300m", // 30분
        issuer: "토큰발급자",
      }
    );

    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

// 발급된 토큰으로 회원 검증후 해당 회원 정보 return
router.get("/login", verifyToken, async (req, res) => {
  const decode = jwt.decode(req.headers.authorization, process.env.JWT_SECRET);
  const { data } = await findByUserID(decode);
  if (data.status == false) {
    delete data.password;
    res.json(data);
  } else {
    res.status(404).send("Not Found Recode");
  }
});

module.exports = router;
