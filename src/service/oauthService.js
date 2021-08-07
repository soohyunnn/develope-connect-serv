import models from "../models";
import axios from "axios";
import {
  findByKakaoEmail,
  findByNaverEmail,
  findByFacebookEmail,
  findByGoogleEmail,
  findByAppleEmail,
} from "./AccountService";
import { logger } from "../config/winston";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// var dotenv = require("dotenv");

dotenv.config(); //LOAD CONFIG
// const jwt = require("jsonwebtoken");
const KAKAO_URL = process.env.KAKAO_URL;
const FACEBOOKURL = process.env.FACEBOOKURL;
const NAVERURL = process.env.NAVERURL;
const GOOGLEURL = process.env.GOOGLEURL;

export const kakaoLogin = async (req, res) => {
  try {
    const res = await axios.get(KAKAO_URL, {
      headers: {
        Authorization: "Bearer " + req.accessToken,
      },
    });

    if (res.data != null) {
      const { data } = await findByKakaoEmail(res.data.kakao_account.email);

      if (data != undefined) {
        const token = getToken(data._previousDataValues);
        return { token: token };
      }
      if (data == undefined) {
        return { joinYn: false };
      }
    }
  } catch (e) {
    logger.error(`oauthService - kakaoLogin: ${JSON.stringify(e)}`);
    throw e;
  }
};

export const facebookLogin = async (req, res) => {
  try {
    const res = await axios.get(FACEBOOKURL, {
      headers: {
        Authorization: "Bearer " + req.accessToken,
        fields: "id%2Cname",
        access_token: req.accessToken,
      },
    });

    if (res.data != null) {
      const { data } = await findByFacebookEmail(req.email);
      if (data != undefined) {
        const token = getToken(data._previousDataValues);
        return { token: token };
      }
      if (data == undefined) {
        return { joinYn: false };
      }
    }
  } catch (e) {
    logger.error(`oauthService - facebookLogin: ${JSON.stringify(e)}`);
    throw e;
  }
};

export const naverLogin = async (req, res) => {
  try {
    const res = await axios.get(NAVERURL, {
      headers: {
        Authorization: "Bearer " + req.accessToken,
      },
    });

    if (res.data != null) {
      const { data } = await findByNaverEmail(res.data.response.email);

      if (data != undefined) {
        const token = getToken(data._previousDataValues);
        return { token: token };
      }
      if (data == undefined) {
        return { joinYn: false };
      }
    }
  } catch (e) {
    logger.error(`oauthService - naverLogin: ${JSON.stringify(e)}`);
    throw e;
  }
};

export const googleLogin = async (req, res) => {
  try {
    const res = await axios.get(GOOGLEURL, {
      headers: {
        Authorization: "Bearer " + req.accessToken,
        access_token: req.accessToken,
      },
    });

    if (res.data != null) {
      const { data } = await findByGoogleEmail(res.data.email);
      if (data != undefined) {
        const token = getToken(data._previousDataValues);
        return { token: token };
      }
      if (data == undefined) {
        return { joinYn: false };
      }
    }
  } catch (e) {
    logger.error(`oauthService - googleLogin: ${JSON.stringify(e)}`);
    throw e;
  }
};

export const appleLogin = async (req, res) => {
  try {
    const decode = jwt.decode(req.identityToken);
    if (decode != null) {
      const { data } = await findByAppleEmail(decode.email);
      if (data.status == true) {
        res.status(404).send("Not Found Recode");
      }
      if (data != undefined) {
        const token = getToken(data._previousDataValues);
        return { token: token, email: data.apple, name: data.name };
      }
      if (data == undefined) {
        return { joinYn: false, email: decode.email, name: decode.name };
      }
    }
  } catch (e) {
    logger.error(`oauthService - appleLogin: ${JSON.stringify(e)}`);
    throw e;
  }
};

//토큰 발급
const getToken = (data) => {
  const token = jwt.sign(
    {
      userId: data.userId,
      name: data.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "300m", // 30분
      issuer: "토큰발급자",
    }
  );
  return token;
};

export default {
  kakaoLogin,
  facebookLogin,
  naverLogin,
  googleLogin,
  appleLogin,
};
