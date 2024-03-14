import { BusinessService } from "./businessService";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";
import logger from "../../utils/serviceUtils/loggerUtil";
import { ROLE } from "../constants/service-constants";
import { verifyJWT } from "../../utils/serviceUtils/jwtLib";

const handler: any = {};

handler.create = async function (req: any, res: any) {
  let { author, params, body } = getServiceArgs(req, res);

  // validated JWT token.
  const validationResult = validateAuthorizationToken(author);

  logger.info(`validation Result is ${JSON.stringify(validationResult)}`);

  // Validating user based on the role
  if (![ROLE.admin, ROLE.businessOwner].includes(validationResult.userRole)) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const businessService = new BusinessService();

  try {
    const result = await businessService.create(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "Business Listed SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Listing Failed",
      error,
    });
  }
};

handler.update = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  // validated JWT token.
  const validationResult = validateAuthorizationToken(author);

  // Validating user based on the role
  if (![ROLE.admin, ROLE.businessOwner].includes(validationResult.userRole)) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const businessService = new BusinessService();

  try {
    const result = await businessService.update(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "Business Listing Updated SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Listing Updation Failed",
      error,
    });
  }
};

handler.get = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  if (!params.businessId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "business ID is mandatory",
    });
  }

  const businessService = new BusinessService();

  try {
    const result = await businessService.get(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Business Listing Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Listing Fetching Failed",
      error,
    });
  }
};

handler.getAll = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  const businessService = new BusinessService();

  try {
    const result = await businessService.getAll(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Business Listing Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Listing Fetching Failed",
      error,
    });
  }
};

handler.delete = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  if (!params.businessId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "business ID is mandatory",
    });
  }

  // validated JWT token.
  const validationResult = validateAuthorizationToken(author);

  // Validating user based on the role
  if (![ROLE.admin].includes(validationResult.userRole)) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const businessService = new BusinessService();

  try {
    const result = await businessService.delete(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Business Deletion SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Deletion Failed",
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

/**
 * Wrapper to validate JWT token
 * @param author
 * @returns
 */
function validateAuthorizationToken(author: any) {
  const validationResult: any = verifyJWT(author.token);
  if (validationResult.errorMessage) {
    throw new Error(validationResult.errorMessage);
  }

  return validationResult;
}

export default handler;
