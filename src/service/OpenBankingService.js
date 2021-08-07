import axios from "axios";
import qs from "qs";

// const axios = require("axios");
// const qs = require("qs");

const INAPP_URL = process.env.INAPP_URL;

export const authorize = async (req, res) => {
  try {
    const result = await axios
      .post(
        `https://testapi.openbanking.or.kr/oauth/2.0/token`,
        qs.stringify(
          {
            client_id: "8049eaf0-e638-4717-840c-e449da4f2536",
            client_secret: "2d959ea7-11cc-49c1-a623-97943a6b7cbf",
            scope: "oob",
            grant_type: "client_credentials",
          },
          {
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
      )
      .then((d) => {
        // console.log("d", d);
        return d.data;
      })
      .catch((c) => {
        console.log("ccc", c);
      });

    console.log(result);
    return result;
  } catch (e) {
    throw e;
  }
};

// https://openapi.openbanking.or.kr/v2.0/inquiry/real_name
export const realName = async (req, res) => {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 9;
  var randomstring = "";
  for (var i = 0; i < string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  try {
    const header = {
      Authorization: "Bearer" + req.token,
    };
    // const body = {
    //   bank_tran_id: "M202112414U4BC34239A",
    //   bank_code_std: "088",
    //   account_num: "110193462528",
    //   account_holder_info_type: "",
    //   account_holder_info: "951113",
    //   tran_dtime: "20210802095300",
    // };

    console.log("randomstring", randomstring);
    const now = new Date();
    const tranDtime =
      now.getFullYear() +
      "" +
      now.getMonth() +
      "" +
      now.getDate() +
      "" +
      now.getHours() +
      "" +
      now.getMinutes() +
      "" +
      now.getSeconds();
    console.log("now", tranDtime);

    const body = {
      bank_tran_id: "M202112414U" + randomstring,
      bank_code_std: req.bankCode,
      account_num: req.accountNum,
      account_holder_info_type: "",
      account_holder_info: req.accountHolderInfo,
      tran_dtime: tranDtime,
    };

    const result = await axios.post(
      `${INAPP_URL}/v2.0/inquiry/real_name`,
      body,
      header
    );
    console.log("result", result);
    return result.data;
  } catch (e) {
    throw e;
  }
};

export default {
  authorize,
  realName,
};
