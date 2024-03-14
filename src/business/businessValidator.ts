import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";

/**
 * Validate user payload
 * @param payload
 * @returns ValidationResultInterface
 */
export function validateBusinessRequestPayload(
  payload: any
): ValidationResultInterface {
  const validationResult: ValidationResultInterface = {
    status: true,
    message: `Business payload validation successful`,
  };

  if (!payload.businessName) {
    validationResult.status = false;
    validationResult.message =
      "Business name is mandatory for listing business";
    return validationResult;
  }

  if (!payload.ownerId || !payload.ownerName) {
    validationResult.status = false;
    validationResult.message =
      "Business Owner information is mandatory for listing business";
    return validationResult;
  }

  if (!payload.businessContactNumber) {
    validationResult.status = false;
    validationResult.message =
      "Business contact is mandatory for listing business";
    return validationResult;
  }

  if (!payload.businessAddress || !payload.businessCity) {
    validationResult.status = false;
    validationResult.message =
      "Business location is mandatory for listing business";
    return validationResult;
  }

  return validationResult;
}
