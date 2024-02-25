import UserInterface from "../../utils/interfaces/userInterface";
import logger from "../../utils/serviceUtils/loggerUtil";
import { Postgres } from "../../utils/serviceUtils/postgres/postgresUtil";
import { serviceConstants } from "../constants/service-constants";

export class UserDao {
  // setting dataBaseName for the dao class
  private dataBaseName: string = serviceConstants.DATABASE;

  // setting tableName for the dao class
  private tableName: string = serviceConstants.PROFILE_TABLE;

  // setting property for creating connection
  postgres: any;

  constructor() {
    // creating postgres client
    this.postgres = new Postgres();
  }

  async create(user: UserInterface): Promise<UserInterface> {
    return this.createUserInPostgres(user);
  }

  async update(user: UserInterface): Promise<UserInterface> {
    return this.updateUserInPostgres(user);
  }

  private async createUserInPostgres(
    user: UserInterface
  ): Promise<UserInterface> {
    let data: any;
    const sqlQuery: string = `INSERT INTO ${this.tableName}(
        "userId","userName",
        "userRole","createdTS",
        "updatedTS") values($1,$2,$3,$4,$5)`;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        user.userId,
        user.userName,
        user.userRole,
        user.createdTS,
        user.updatedTS,
      ]);
      logger.info(`User creation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while creating user ${error}`);
      throw new Error(`Getting error while creating user ${error}`);
    }

    logger.info(`data is ${JSON.stringify(data)}`);
    return user;
  }

  private async updateUserInPostgres(
    user: UserInterface
  ): Promise<UserInterface> {
    let data: any;
    // Preparing sql update query
    const sqlQuery: string = `UPDATE ${this.tableName} 
        SET  
            "userName"=$1 ,"userRole" = $2,
            "updatedTS" = $3

        WHERE "userId" = $4
        `;

    // initializing connection with the database
    await this.postgres.connect(this.dataBaseName);

    // Trying to execute postgres query
    try {
      data = await this.postgres.execute(sqlQuery, [
        user.userName,
        user.userRole,
        user.updatedTS,
        user.userId,
      ]);
      logger.info(`User Updation dao operation is successful`);
    } catch (error) {
      logger.error(`Getting error while updation user ${error}`);
      throw new Error(`Getting error while updation user ${error}`);
    }

    return user;
  }
}
