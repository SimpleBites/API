const {categoryseeder} = require("./recipe_categories_seeder.js")
const {userseeder} = require("./userseeder.js")
const {recipeseeder} = require("./recipeseeder.js")
const {commentseeder} = require("./comments_seeder.js")
const {ingredientseeder} = require("./ingredientseeder.js")
const {recipeIngredientSeeder} = require("./recipe_ingredients_seeder.js")
const {recipeViewCountSeeder} = require("./recipe_view_count_seeder.js")
categoryseeder();
userseeder();
recipeseeder();
commentseeder();
ingredientseeder();
recipeIngredientSeeder();
recipeViewCountSeeder()