const sequelize = require("../../db/db");

class UnitOfWork {
  #dbContext;
  #repositoriesMap;
  #transaction;

  constructor(repositoriesMap) {
    this.#dbContext = sequelize;
    this.#repositoriesMap = repositoriesMap;
    this.#transaction = null;
  }

  get dbContext() {
    return this.#dbContext;
  }

  get repositories() {
    return this.#repositoriesMap;
  }

  get transaction() {
    return this.#transaction;
  }

  set transaction(transaction) {
    this.#transaction = transaction;
  }

  getRepository(repoName) {
    return this.repositories[repoName];
  }

  async beginTransaction() {
    const transaction = await this.dbContext.transaction();
    this.transaction = transaction;
    return transaction;
  }

  async commitTransaction() {
    await this.transaction.commit();
    this.transaction = null;
  }

  async rollbackTransaction() {
    await this.transaction.rollback();
    this.transaction = null;
  }

  async execute(callback) {
    await this.beginTransaction();
    try {
      const result = await callback();
      await this.commitTransaction();
      return result;
    } catch (err) {
      await this.rollbackTransaction();
    }
  }
}

module.exports = UnitOfWork;
