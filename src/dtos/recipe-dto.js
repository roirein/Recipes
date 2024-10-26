class RecipeDto {
  constructor({
    id,
    title,
    description,
    image,
    amountOfServings,
    cookingType,
    tags,
    meals,
    cuisines,
    ingredients,
    instructions,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.amountOfServings = amountOfServings;
    this.cookingType = cookingType;
    this.tags = tags;
    this.meals = meals;
    this.cuisines = cuisines;
    this.ingredients = ingredients;
    this.instructions = instructions;
  }
}

module.exports = RecipeDto;
