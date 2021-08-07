import { createAccountDevice } from "../../service/AccountDeviceService";

export const insertAccountDevice = async (req, res, next) => {
  createAccountDevice(req.body)
    .then((d) => {
      res.status(200).send(d);
    })
    .catch((e) => {
      if (e.status == "404") {
        res.status(404).send("Not Fount Recode");
      }
    });
};

export default {
  insertAccountDevice,
};
