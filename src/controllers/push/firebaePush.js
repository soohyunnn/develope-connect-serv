// const admin = require("firebase-admin");
// const serviceAccount = require("../../cheers-1904e-firebase-adminsdk-95nfu-b853e7916b.json");
// const { logger } = require("../../config/winston");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const send = async ({ title = "치어스 푸시 알람", message }) => {
//   try {
//     logger.info(`푸시알람 : ${title}, ${body}`);
//     lettokenList = newArray();
//     letarr = newArray();
//     if ((req.type = "newLetter")) {
//       //신규레터 수신동의한 사람만 조회
//       constresultAccount = awaitmodels.Account.findAll({
//         where: { receiveNewLetterYn: true },
//       });

//       if (resultAccount != null) {
//         resultAccount.dataValues.map((d) => {
//           arr.push(d.id);
//         });
//         constresultAccountDevice = awaitmodels.AccountDevice.findAll({
//           where: { user_id: arr },
//         });
//         if (resultAccountDevice != null) {
//           resultAccountDevice.dataValues.map((d) => {
//             tokenList.push(d.device_token);
//           });
//         }
//       }
//     }
//     console.log("2222", arr);
//     console.log("1111", tokenList);
//     lettarget_token =
//       "dmjUDdUn_0f5m2DSEp6giN:APA91bFyR3kT2mZLQQsBgNAhVZDTx0F0de5BW2e09-HkTikSKzzb137xhDMT3nU9p9gwCz4ZuAntijx1lpFuWgnaSb1DzMKOXX0BFG2bc0DAU4t-QMdZNTYwtB91UU_5wBv25ISPCNbq"; //target_token은 푸시 메시지를 받을 디바이스 토큰값입니다.

//     // let message = {
//     // notification: {
//     // title: req.title,
//     // body: req.body,
//     // },
//     // token: target_token,
//     // };
//     letmessage = {
//       notification: {
//         title: title,
//         body: message,
//       },
//       token: target_token,
//     };
//     admin
//       .messaging()
//       .send(message)
//       .then(function (response) {
//         console.log("Successfully sent message: : ", response);
//         returnres.status(200).json({ success: true });
//       })
//       .catch(function (err) {
//         console.log("Error Sending message!!! : ", err);
//         returnres.status(400).json({ success: false });
//       });
//     // send({
//     // tokens: target_token,
//     // title: req.query.title,
//     // body: req.query.message,
//     // data: {
//     // action: "chat",
//     // chatId: "1111",
//     // },
//     // });
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   send,
// };
