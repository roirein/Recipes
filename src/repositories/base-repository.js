const { Model } = require("sequelize");

class BaseRepository {
  #model;
  /**
   *
   * @param {typeof Model} model - sequelize model for the repository
   * @description the model used for the data access
   */
  constructor(model) {
    this.#model = model;
  }

  /**
   * @returns {typeof Model}the model for the data access
   */
  get model() {
    return this.#model;
  }

  /**
   *
   * @param {object} recordData - data for create a record
   * @returns {Promise<Model<T>>} -returns newly created record
   */
  async createRecord(recordData) {
    //type of record data will be decided later
    return await this.#model.create(recordData);
  }
}

module.exports = BaseRepository;
