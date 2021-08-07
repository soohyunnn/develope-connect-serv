import { logger } from "../../config/winston";
import { createPayment } from "../../service/PaymentService";

export const savePaymentHistory = async (req, res, next) => {
  logger.info(`인앤결제 내역 저장 => ${JSON.stringify(req.body)}`);
  createPayment(req.body)
    .then((d) => {
      // res.status(200).send(d);
      res.json(d);
    })
    .catch((e) => {
      console.log("e", e);
      res.status(400).send("BAD REQUEST");
    });
};

export default {
  savePaymentHistory,
};
