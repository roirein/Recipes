const CreateRecipeDto = require("../dtos/create-recipe-dto");
const RecipeService = require("../services/recipe-service");
const BaseController = require("./base-controller");
const { Request, Response, NextFunction } = require("express");

class RecipeController extends BaseController {
  constructor() {
    super(new RecipeService());
  }

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async createRecipe(req, res, next) {
    //validation and proper error handling will be added later
    try {
      const createRecipeDto = new CreateRecipeDto({
        ...req.body,
        image: req.file.path,
        ingredients: JSON.parse(req.body.ingredients),
        instructions: JSON.parse(req.body.instructions),
      });
      const newRecipe = await this.service.createRecipe(createRecipeDto);
      res.status(201).json({ recipe: newRecipe });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RecipeController;
