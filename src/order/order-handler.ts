import { OrderService } from "./order-service";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";
import { ROLE } from "../constants/service-constants";
import logger from "../../utils/serviceUtils/loggerUtil";

const handler: any = {};

handler.create = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  // Validating user based on the role
  if (author.userrole !== ROLE.user) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const orderService = new OrderService();

  try {
    const result = await orderService.create(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "Order Created SuccessFully!!!",
      result,
    });
  } catch (error) {
    logger.error(`Error is ${JSON.stringify(error)}`);
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Order Creation Failed",
      error,
    });
  }
};

handler.update = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  const orderService = new OrderService();

  try {
    const result = await orderService.update(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "Order Updated SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Order Updation Failed",
      error,
    });
  }
};

function getServiceArgs(req: any, res: any) {
  const body = req.body || {};

  // Ref:- https://expressjs.com/en/api.html#req.params
  const params = {
    ...req.query,
    ...req.params,
  };

  const author = req.headers;

  return {
    author,
    params,
    body,
  };
}

export default handler;
