import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";

/**
 * Validate review payload
 * @param payload
 * @returns ValidationResultInterface
 */
export function validateReviewRequestPayload(
  payload: any
): ValidationResultInterface {
  const validationResult: ValidationResultInterface = {
    status: true,
    message: `Review payload validation successful`,
  };

  if (!payload.businessId) {
    validationResult.status = false;
    validationResult.message = "Business Id is mandatory for adding reviews";
    return validationResult;
  }

  if (!payload.userId) {
    validationResult.status = false;
    validationResult.message =
      "User information is mandatory for adding reviews";
    return validationResult;
  }

  return validationResult;
}
