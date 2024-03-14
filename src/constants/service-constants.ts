export const APPLICATION_VERSION: string = "v1";

// @ts-ignore
export const APPLICATION_PORT: number = parseInt(process.env.APPLICATION_PORT);

export enum serviceConstants {
  DATABASE = "commondb",
  BUSINESS_TABLE = "business",
  REVIEW_TABLE = "review",
  PROFILE_TABLE = "userAuthProfile",
}

export enum ROLE {
  admin = "ADMIN",
  user = "USER",
  businessOwner = "businessOwner",
}
