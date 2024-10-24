const cuisines = require("./consts/cuisines");
const ingirdientCategories = require("./consts/ingirdient-categories");
const ingridients = require("./consts/ingridients");
const mealTypes = require("./consts/meal-types");
const tags = require("./consts/tags");
const { Tag, Cuisine, MealType } = require("./models");
const Ingredient = require("./models/ingredient");

const insertTags = async () => {
  const tagRecords = tags.map((t) => {
    return {
      type: t,
    };
  });
  await Tag.bulkCreate(tagRecords);
};

const insertCuisines = async () => {
  const cuisineRecords = cuisines.map((c) => {
    return {
      type: c,
    };
  });
  await Cuisine.bulkCreate(cuisineRecords);
};

const insertMealTypes = async () => {
  const mealTypesRecoreds = mealTypes.map((mt) => {
    return {
      type: mt,
    };
  });
  await MealType.bulkCreate(mealTypesRecoreds);
};

const insertIngredients = async () => {
  const ingredientsPerCategories = Object.values(ingridients);
  const ingridientsRecords = ingredientsPerCategories.map((ingCat, i) => {
    return ingCat.map((ing) => {
      return {
        type: ing,
        category: ingirdientCategories[i],
      };
    });
  });
  const promises = ingridientsRecords.map((ingArr) =>
    Ingredient.bulkCreate(ingArr)
  );
  await Promise.all(promises);
};

const seedDb = async () => {
  await insertTags();
  await insertCuisines();
  await insertMealTypes();
  await insertIngredients();
};

module.exports = seedDb;
