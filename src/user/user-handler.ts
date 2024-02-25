import { UserService } from "./user-service";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";
import { ROLE } from "../constants/service-constants";

const handler: any = {};

handler.create = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  // Validating user based on the role
  if (author.userrole !== ROLE.admin) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const userService = new UserService();

  try {
    const result = await userService.create(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "User Created SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "User Creation Failed",
      error,
    });
  }
};

handler.update = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  // Validating user based on the role
  if (author.userrole !== ROLE.admin) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const userService = new UserService();

  try {
    const result = await userService.update(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "User Updated SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "User Updation Failed",
      error,
    });
  }
};

function getServiceArgs(req: any, res: any) {
  const body = req.body || {};

  const params = {
    ...req.query,
  };

  if (req.path) {
    params.userId = req.path.slice(1, req.path.length);
  }

  const author = req.headers;

  return {
    author,
    params,
    body,
  };
}

export default handler;
