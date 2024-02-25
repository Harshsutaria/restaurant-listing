import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";

export function validateUserRequestPayload(payload: any) {
  const validationResult: ValidationResultInterface = {
    status: true,
    message: `Profile validation successfully`,
  };

  if (!payload.userName) {
    validationResult.status = false;
    validationResult.message = "Profile name is mandatory for creating profile";
    return validationResult;
  }

  if (!payload.userRole) {
    validationResult.status = false;
    validationResult.message = "Profile role is mandatory for creating profile";
    return validationResult;
  }

  return validationResult;
}
