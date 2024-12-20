const BaseRepository = require("../data-access/repositories/base-repository");
const UnitOfWork = require("../data-access/units-of-works/unit-of-work");

class BaseService {
  #repository;
  #unitOfWork;
  /**
   *
   * @param {BaseRepository} repositroy - the repository the service communiccate with
   * @param {UnitOfWork} unitOfWork - in case of cross table operation unit of work will be used, optional parameter
   */
  constructor(repositroy, unitOfWork = null) {
    this.#repository = repositroy;
    this.#unitOfWork = unitOfWork;
  }

  /**
   * @returns {BaseRepository} - the instance the repository the service works with
   */
  get repositroy() {
    return this.#repository;
  }

  get unitOfWork() {
    return this.#unitOfWork;
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
