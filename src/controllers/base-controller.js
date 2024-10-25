const BaseService = require("../services/base-service");
const { Request, Response, NextFunction } = require("express");

class BaseController {
  #service;
  /**
   *
   * @param {BaseService} service
   */
  constructor(service) {
    this.#service = service;
  }

  /**
   * @returns {BaseService} - the service the controller use
   */
  get service() {
    return this.#service;
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async create(req, res, next) {
    try {
      const record = await this.service.create(req.body);
      res.status(201).json(record);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BaseController;
