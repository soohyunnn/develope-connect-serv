import { settlement } from "../../service/BatchService";
import { logger } from "../../config/winston";

export const monthSettlement = async (req, res, next) => {
  logger.info(`월정산 배치 START`);
  settlement();
};

export default {
  monthSettlement,
};
