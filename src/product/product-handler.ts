import { ProductService } from "./product-service";
import HTTPConst from "../../utils/serviceUtils/HttpStatusCodes";
import logger from "../../utils/serviceUtils/loggerUtil";
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

  const productService = new ProductService();

  try {
    const result = await productService.create(author, params, body);
    return res.json({
      code: HTTPConst.success.CREATED,
      message: "Product Created SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Product Creation Failed",
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

  const productService = new ProductService();

  try {
    const result = await productService.update(author, params, body);
    return res.json({
      code: HTTPConst.success.ACCEPTED,
      message: "Product Updated SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Product Updation Failed",
      error,
    });
  }
};

handler.get = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  logger.info(`get params is ${JSON.stringify(params)}`);
  if (!params.productId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "Product ID is mandatory",
    });
  }

  const productService = new ProductService();

  try {
    const result = await productService.get(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Product Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Product Fetching Failed",
      error,
    });
  }
};

handler.getAll = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  const productService = new ProductService();

  try {
    const result = await productService.getAll(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Product Fetched SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Product Fetching Failed",
      error,
    });
  }
};

handler.delete = async function (req: any, res: any) {
  const { author, params } = getServiceArgs(req, res);

  if (!params.productId) {
    return res.json({
      code: HTTPConst.clientError.BAD_REQUEST,
      message: "Product ID is mandatory",
    });
  }

  // Validating user based on the role
  if (author.userrole !== ROLE.admin) {
    return res.json({
      code: HTTPConst.clientError.UNAUTHORIZED,
      message: "USER IS UNAUTHORIZED FOR THIS ACTION",
    });
  }

  const productService = new ProductService();

  try {
    const result = await productService.delete(author, params);
    return res.json({
      code: HTTPConst.success.OK,
      message: "Product Deletion SuccessFully!!!",
      result,
    });
  } catch (error) {
    return res.json({
      code: HTTPConst.serverError.INTERNAL_SERVER,
      message: "Product Deletion Failed",
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
    params.productId = req.path.slice(1, req.path.length);
  }

  const author = req.headers;

  return {
    author,
    params,
    body,
  };
}

export default handler;
