const {pool,connection} = require("../mysql")

const recipeseeder = () => {
    pool.getConnection(function(err, connection){
 
    const recipes = [
        {
            title: "pancakes",
            description: "delicious pancakes",
            image: "pancakes.jpg",
            average_score: "4.30",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            servings: 12,
            user_id: 2,
            category_id: 2,
        },
        {
            title: "HAMBURGER",
            description: "hamm hamm hamm gur gur gur",
            image: "burger.png",
            average_score: "4.46",
            difficulty: "intermediate",
            preparation_time: "10 minutes",
            cooking_time: "40 minutes",
            servings: 4,
            user_id: 2,
            category_id: 2,
        },
        {
            title: "hotdogg",
            description: "buddy you got that hot dog?",
            image: "dog.jpg",
            average_score: "4.10",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            servings: 6,
            user_id: 2,
            category_id: 2,
        },
        {
            title: "spaghetti",
            description: "delicious spaghetti",
            image: "spaghetti.jpg",
            average_score: "4.30",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            servings: 4,
            user_id: 2,
            category_id: 2,
        },
    ]
  
        recipes.forEach(recipe => {
          connection.query('INSERT INTO recipes (title, image, average_score , difficulty, preparation_time, cooking_time,  servings,  user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [recipe.title, recipe.description, recipe.recipe_image, recipe.average_score, recipe.difficulty, recipe.preparation_time, recipe.cooking_time, recipe.servings, recipe.user_id, recipe.category_id], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  //connection.release();
                  console.error('Error inserting recipe.', err);
                });
                return;
            }
        })
        console.log("recipe table seeded")
    })

    connection.release()
})
}

module.exports = {recipeseeder}