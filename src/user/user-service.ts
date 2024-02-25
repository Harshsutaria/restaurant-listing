import UserInterface from "../../utils/interfaces/userInterface";
import ValidationResultInterface from "../../utils/interfaces/validationResultInterface";
import { UserDao } from "./user-dao";
import { validateUserRequestPayload } from "./user-validation";
import { v4 as uuidv4 } from "uuid";
import logger from "../../utils/serviceUtils/loggerUtil";

export class UserService {
  private userDao;

  constructor() {
    this.userDao = new UserDao();
  }

  async create(author: any, params: any, body: any) {
    logger.info(
      `INSIDE CREATE USER SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateUserRequestPayload(body);
    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create product object
    const user: UserInterface = this.createUserRequestPayload(body);

    // Inserting product into database
    const result: UserInterface = await this.userDao.create(user);

    // returning result
    return result;
  }

  async update(author: any, params: any, body: any) {
    logger.info(
      `INSIDE UPDATE USER SERVICE ${JSON.stringify({
        author,
        params,
        body,
      })}`
    );

    // validate request payload
    const validationResult: ValidationResultInterface =
      validateUserRequestPayload(body);

    if (!validationResult.status) {
      throw new Error(validationResult.message);
    }

    // create user object
    const user: UserInterface = this.updateUserRequestPayload(body);

    // Inserting user into database
    const result: UserInterface = await this.userDao.update(user);

    // returning result
    return result;
  }

  private createUserRequestPayload(payload: any): UserInterface {
    return {
      userId: uuidv4(),
      createdTS: new Date().toISOString(),
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }

  private updateUserRequestPayload(payload: any): UserInterface {
    return {
      updatedTS: new Date().toISOString(),
      ...payload,
    };
  }
}
