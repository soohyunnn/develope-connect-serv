import models from "../models";
import { Op } from "sequelize";
import { logger } from "../config/winston";
import sequelize from "sequelize";
import cron from "node-cron";

//매월 20일
export const settlement = cron.schedule("* * 20 * *", async () => {
  try {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth();

    const lastDate = new Date(year, month, 0).getDate();
    const sDate = new Date(year, month - 1);
    const eDate = new Date(year, month - 1, lastDate, 23, 59);
    if (String(month).length == 1) {
      month = "0" + String(month + 1);
    }
    const settlementMonth = year + "" + month;
    //전달 1~말일 결제내역 조회
    const resultPayment = await models.Payment.findAll({
      where: {
        createdAt: {
          [Op.between]: [sDate, eDate],
        },
      },
      attributes: [
        "user_id",
        [
          sequelize.fn("sum", sequelize.col("payment_amount")),
          "payment_amount",
        ],
      ],
      group: ["user_id"],
    });

    const mapTest = await Promise.all(
      resultPayment.map((payment) => {
        console.log("resultPayment", payment.dataValues);

        const resultAccount = models.Account.findOne({
          where: { id: payment.dataValues.user_id },
        })
          .then((d) => {
            logger.info(`resultAccount : ${JSON.stringify(d.dataValues)}`);
            //정산 DB에 저장
            models.Settlement.create({
              user_id: d.dataValues.id,
              user_user_id: d.dataValues.userId,
              user_name: d.dataValues.name,
              total_amount: payment.dataValues.payment_amount,
              settlement_month: settlementMonth,
              settlement_amount:
                payment.dataValues.payment_amount -
                payment.dataValues.payment_amount * 0.01,
              fee: payment.dataValues.payment_amount * 0.01,
              settlement_yn: false,
            }).then((settlement) => {
              logger.info(
                `settlement :  ${JSON.stringify(settlement.dataValues)}`
              );
            });
          })
          .catch((e) => {
            throw e;
          });

        if (resultAccount == null) {
          const e = new Error("Not Found Recod");
          e.status = 404;
          e.message = "Not Found Recod";
          throw e;
        }
      })
    );
  } catch (e) {
    console.log("e", e);
    throw e;
  }
});

export default {
  settlement,
};
