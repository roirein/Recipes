class UnitOfWork {
  #dbContext;
  #repositoriesMap;
  #transaction;

  constructor(repositoriesMap, dbContext) {
    this.#dbContext = dbContext;
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
  }

  async commitTransaction() {
    await this.transaction.commit();
    this.transaction = null;
  }

  async rollbackTransaction() {
    await this.transaction.rollback();
    this.transaction = null;
  }
}

module.exports = UnitOfWork;
