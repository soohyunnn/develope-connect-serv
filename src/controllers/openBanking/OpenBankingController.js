import { authorize, realName } from "../../service/OpenBankingService";

export const RealNameAccountVerification = async (req, res, next) => {
  const result = await authorize(req.param);
  if (result !== undefined) {
    res.status(200).send(result);
  } else {
    res.status(500).send("Server error.");
  }
};

export const accountRealNameInquiry = async (req, res, next) => {
  await realName(req.param)
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

export default {
  RealNameAccountVerification,
  accountRealNameInquiry,
};
