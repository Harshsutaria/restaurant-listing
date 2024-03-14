import { UserAuthService } from "./userAuthService";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";

const handler: any = {};

handler.signUp = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  const userAuthService = new UserAuthService();

  try {
    const result = await userAuthService.signUp(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "User Sign up SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "User Sign up Failed",
      error,
    });
  }
};

handler.login = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  const userAuthService = new UserAuthService();

  try {
    const result = await userAuthService.login(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "User Login SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "User Login Failed",
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
