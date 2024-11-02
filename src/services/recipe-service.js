const TagRepository = require("../data-access/repositories/tag-repository");
const CreateRecipeDto = require("../dtos/create-recipe-dto");
const RecipeDto = require("../dtos/recipe-dto");
const RecipeRepositry = require("../data-access/repositories/recipe-repository");
const BaseService = require("./base-service");
const CuisineRepository = require("../data-access/repositories/cuisine-repository");
const MealRepository = require("../data-access/repositories/meal-repository");
const UnitOfWork = require("../data-access/units-of-works/unit-of-work");
const InstructionRepository = require("../data-access/repositories/instruction-repository");
const IngredientRepository = require("../data-access/repositories/ingredient-repository");
const RecipeIngredientRepository = require("../data-access/repositories/recipe-ingredient-repository");

class RecipeService extends BaseService {
  constructor() {
    const recipeRepository = new RecipeRepositry();
    const tagRepository = new TagRepository();
    const cuisineRepository = new CuisineRepository();
    const mealRepository = new MealRepository();
    const instructionRepository = new InstructionRepository();
    const ingredientRepository = new IngredientRepository();
    const recipeIngredientRepository = new RecipeIngredientRepository();
    const repositoriesMap = {
      recipe: recipeRepository,
      tag: tagRepository,
      cuisine: cuisineRepository,
      meal: mealRepository,
      instruction: instructionRepository,
      ingredient: ingredientRepository,
      recipeIngrdient: recipeIngredientRepository,
    };
    super(recipeRepository, new UnitOfWork(repositoriesMap));
  }

  /**
   *
   * @param {CreateRecipeDto} createRecipeDto - the data for the new recipe
   * @returns {Promise<RecipeDto>} - dto of the newly created recipe
   */
  async createRecipe(createRecipeDto) {
    return this.unitOfWork.execute(async () => {
      const { tags, mealTypes, cuisines, ingredients, ...rest } =
        createRecipeDto;
      const recipeRepo = this.repositroy;
      const transaction = this.unitOfWork.transaction;
      const newRecipe = await this.#createRecipeRecord(rest, transaction);

      await this.#addRecipeData(newRecipe, "tag", tags, "addTags", transaction);
      await this.#addRecipeData(
        newRecipe,
        "cuisine",
        cuisines,
        "addCuisines",
        transaction
      );
      await this.#addRecipeData(
        newRecipe,
        "meal",
        mealTypes,
        "addMeals",
        transaction
      );

      await this.#addRecipeIngredients(ingredients, newRecipe.id, transaction);
      return new RecipeDto({
        id: newRecipe.id,
        meals: mealTypes,
        ...createRecipeDto,
      });
    });
  }

  async #createRecipeRecord(recipeData, transaction) {
    const recipeRepo = this.unitOfWork.getRepository("recipe");
    const instructionRepo = this.unitOfWork.getRepository("instruction");
    const newRecipe = await recipeRepo.createRecord(recipeData, {
      transaction,
      include: [{ model: instructionRepo.model, as: "instructions" }],
    });
    return newRecipe;
  }

  async #addRecipeIngredients(ingredients, recipeId, transaction) {
    const ingredientPromises = ingredients.map(async (ing) => {
      const { ingredient, ...rest } = ing;
      const ingRecord = await this.unitOfWork
        .getRepository("ingredient")
        .findOne({ where: { type: ingredient }, transaction });
      return this.unitOfWork.getRepository("recipeIngrdient").createRecord(
        {
          ...rest,
          recipeId,
          ingredientId: ingRecord.id,
        },
        { transaction }
      );
    });
    await Promise.all(ingredientPromises);
  }

  async #addRecipeData(
    recipe,
    recipeInfoKey,
    recipeInputData,
    methodName,
    transaction
  ) {
    const repository = this.unitOfWork.getRepository(recipeInfoKey);
    const relatedRecipeData = await repository.findAll({
      where: { type: recipeInputData },
      transaction,
    });
    this.repositroy[methodName](recipe, relatedRecipeData, transaction);
  }
}

module.exports = RecipeService;
