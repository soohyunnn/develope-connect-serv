import { logger } from "../../config/winston";
import {
  kakaoLogin,
  facebookLogin,
  naverLogin,
  googleLogin,
  appleLogin,
} from "../../service/oauthService";

export const kakao = async (req, res, next) => {
  await kakaoLogin(req.body)
    .then((d) => {
      console.log("d", d);
      logger.info(`oauthController - kakao : ${JSON.stringify(d)}`);
      res.status(200).send(d);
    })
    .catch((e) => {
      logger.info(`oauthController - kakao : ${JSON.stringify(e)}`);
      res.status(e.response.status).send(e.response.statusText);
    });
};

export const facebook = async (req, res, next) => {
  await facebookLogin(req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(e.response.status).send(e.response.statusText);
    });
};

export const naver = async (req, res, next) => {
  await naverLogin(req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(e.response.status).send(e.response.statusText);
    });
};

export const google = async (req, res, next) => {
  await googleLogin(req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(e.response.status).send(e.response.statusText);
    });
};

export const apple = async (req, res, next) => {
  await appleLogin(req.body)
    .then((d) => {
      console.log("d", d);
      res.status(200).send(d);
    })
    .catch((e) => {
      res.status(e.response.status).send(e.response.statusText);
    });
};

export default {
  kakao,
  facebook,
  naver,
  google,
};
