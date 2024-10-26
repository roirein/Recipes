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
    // step 1 - creating recipe
    const { tags, mealTypes, cuisines, ingredients, ...rest } = createRecipeDto;
    const recipeRepo = this.unitOfWork.getRepository("recipe");
    const instructionRepo = this.unitOfWork.getRepository("instruction");
    const transaction = await this.unitOfWork.beginTransaction();
    const newRecipe = await recipeRepo.createRecord(rest, {
      transaction,
      include: [{ model: instructionRepo.model, as: "instructions" }],
    });

    // step 2 - adding meals, tags and cuisines
    const recipeTags = await this.unitOfWork
      .getRepository("tag")
      .findAll({ where: { type: tags }, transaction });
    await recipeRepo.addTags(newRecipe, recipeTags, transaction);
    const recipeCuisines = await this.unitOfWork
      .getRepository("cuisine")
      .findAll({ where: { type: cuisines }, transaction });
    await recipeRepo.addCuisines(newRecipe, recipeCuisines, transaction);
    const recipeMeals = await this.unitOfWork
      .getRepository("meal")
      .findAll({ where: { type: mealTypes }, transaction });
    await recipeRepo.addMeals(newRecipe, recipeMeals, transaction);

    // step 3 - add ingredients
    const ingredientPromises = ingredients.map(async (ing) => {
      const { ingredient, ...rest } = ing;
      const ingRecord = await this.unitOfWork
        .getRepository("ingredient")
        .findOne({ where: { type: ingredient }, transaction });
      return this.unitOfWork.getRepository("recipeIngrdient").createRecord(
        {
          ...rest,
          recipeId: newRecipe.id,
          ingredientId: ingRecord.id,
        },
        { transaction }
      );
    });
    await Promise.all(ingredientPromises);
    await this.unitOfWork.commitTransaction();

    //step 4 - return dto
    return new RecipeDto({
      id: newRecipe.id,
      meals: mealTypes,
      ...createRecipeDto,
    });
  }
}

module.exports = RecipeService;
