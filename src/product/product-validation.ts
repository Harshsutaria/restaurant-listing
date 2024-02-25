import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";

export function validateProductRequestPayload(payload: any) {
  const validationResult: ValidationResultInterface = {
    status: true,
    message: `Product validation successfully`,
  };

  if (!payload.productTitle || !payload.productCategory) {
    validationResult.status = false;
    validationResult.message = "Product title and category is mandatory";
    return validationResult;
  }

  if (payload.mrp === undefined || !payload.sellingPrice === undefined) {
    validationResult.status = false;
    validationResult.message = "Product price-point information is mandatory";
    return validationResult;
  }

  if (payload.quantity === undefined || !payload.units === undefined) {
    validationResult.status = false;
    validationResult.message = "Product quantity information is mandatory";
    return validationResult;
  }

  return validationResult;
}
