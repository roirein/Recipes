const BaseRepository = require("../repositories/base-repository");

class BaseService {
  #repository;
  /**
   *
   * @param {BaseRepository} repositroy - the repository the service communiccate with
   */
  constructor(repositroy) {
    this.#repository = repositroy;
  }

  /**
   * @returns {BaseRepository} - the instance the repository the service works with
   */
  get repositroy() {
    return this.#repository;
  }

  /**
   *
   * @param {object} data
   * @returns {Promise<Model<T>>} - the newly created record
   */
  async create(data) {
    return await this.repositroy.createRecord(data);
  }
}

module.exports = BaseService;
