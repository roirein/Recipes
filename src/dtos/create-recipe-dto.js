class CreateRecipeDto {
  /**
   *
   * @param {object} data - data needed for creating new recipe
   * @param {string} data.title -  the title of the recipe
   * @param {string} data.description - the description of the recipe
   * @param {number} data.amountOfServings - amount of servings recipe gives
   * @param {number} data.image - the image of the final dish
   * @param {Array<string>} data.tags - the tags of the recipe - e.g gluten free etc...
   * @param {Array<string>} data.mealTypes - the type of meal the recipe is(breakfast, dinner, etc...)
   * @param {Array<string>} data.cuisines - the cuisines associated with the recipe
   * @param {Array<object>} data.ingredients - the ingredients required for the recipe
   * @param {Array<object>} data.instructions - the instructions to make the recipe
   */
  constructor({
    title,
    description,
    amountOfServings,
    cookingTime,
    image,
    tags,
    mealTypes,
    cuisines,
    ingredients,
    instructions,
  }) {
    this.title = title;
    this.description = description;
    this.amountOfServings = amountOfServings;
    this.cookingTime = cookingTime;
    this.image = image;
    this.tags = tags;
    this.mealTypes = mealTypes;
    this.cuisines = cuisines;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}

module.exports = CreateRecipeDto;
