import { ReviewsService } from "./reviewsService";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";
import logger from "../../utils/serviceUtils/loggerUtil";
import { ROLE } from "../constants/service-constants";
import { verifyJWT } from "../../utils/serviceUtils/jwtLib";

const handler: any = {};

handler.create = async function (req: any, res: any) {
  let { author, params, body } = getServiceArgs(req, res);

  // validated JWT token.
  const validationResult = validateAuthorizationToken(author);

  // Validating user based on the role
  if (![ROLE.admin, ROLE.user].includes(validationResult.userRole)) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const reviewService = new ReviewsService();

  try {
    const result = await reviewService.create(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "Review Added SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Unable to Add review",
      error,
    });
  }
};

handler.update = async function (req: any, res: any) {
  const { author, params, body } = getServiceArgs(req, res);

  const reviewService = new ReviewsService();

  try {
    const result = await reviewService.update(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "Review Updated SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Business Updation failed",
      error,
    });
  }
};

handler.get = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  if (!params.reviewId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "review ID is mandatory",
    });
  }

  const reviewService = new ReviewsService();

  try {
    const result = await reviewService.get(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Review Listing Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Review Listing Fetching Failed",
      error,
    });
  }
};

handler.getAll = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  const reviewService = new ReviewsService();

  try {
    const result = await reviewService.getAll(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Review Listing Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Review Listing Fetching Failed",
      error,
    });
  }
};

handler.delete = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  if (!params.reviewId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "Review ID is mandatory",
    });
  }

  // validated JWT token.
  const validationResult = validateAuthorizationToken(author);

  // Validating user based on the role
  if (![ROLE.admin, ROLE.user].includes(validationResult.userRole)) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const reviewService = new ReviewsService();

  try {
    const result = await reviewService.delete(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Review Deletion SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Review Deletion Failed",
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
