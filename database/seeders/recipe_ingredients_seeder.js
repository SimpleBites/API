const {pool, connection} = require("../mysql")
const bcrypt = require("bcrypt")


const recipeIngredientSeeder = () => {
    pool.getConnection(function(err, connection){

    
    const recipe_ingredients = [
        {
            recipe_id: 1,
            ingredient_id: 1,
            quantity: 5
        },
        {
            recipe_id: 2,
            ingredient_id: 1,
            quantity: 1
        },
        {
            recipe_id: 3,
            ingredient_id: 1,
            quantity: 2.5
        },
        {
            recipe_id: 4,
            ingredient_id: 2,
            quantity: 4
        },
        {
            recipe_id: 5,
            ingredient_id: 3,
            quantity: 3
        },
    ]
  
        recipe_ingredients.forEach(ingredient => {
          connection.query('INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity) VALUES (?, ?, ?)', 
            [ingredient.recipe_id, ingredient.ingredient_id, ingredient.quantity], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  console.error('Error inserting user', err);
                });
                return;
            }
        })
        console.log("recipe ingredients table seeded")
    })
    })
}
  

   
module.exports = {recipeIngredientSeeder}