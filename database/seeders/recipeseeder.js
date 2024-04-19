const {pool,connection} = require("../mysql")

const recipeseeder = () => {
    const moment = require("moment")
    let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const recipes = [
        {
            title: "pancakes",
            description: "delicious pancakes",
            image: "uploads/pancakes.jpg",
            average_score: "4.30",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            instructions: JSON.stringify(['step1', 'step2', 'step3']),
            tools: JSON.stringify(["Pastry blender",  "potato masher", "Spatula"]),
            servings: 12,
            user_id: 2,
            category_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate
        },
        {
            title: "HAMBURGER",
            description: "hamm hamm hamm gur gur gur",
            image: "uploads/burger.png",
            average_score: "4.46",
            difficulty: "intermediate",
            preparation_time: "10 minutes",
            cooking_time: "40 minutes",
            instructions: JSON.stringify(['step1', 'step2', 'step3']),
            tools: JSON.stringify(["Pastry blender",  "potato masher", "Spatula"]),
            servings: 4,
            user_id: 2,
            category_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate
        },
        {
            title: "hotdogg",
            description: "buddy you got that hot dog?",
            image: "uploads/hotdog.jpg",
            average_score: "4.10",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            instructions: JSON.stringify(['step1', 'step2', 'step3']),
            tools: JSON.stringify(["Pastry blender",  "potato masher", "Spatula"]),
            servings: 6,
            user_id: 2,
            category_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate
        },
        {
            title: "spaghetti",
            description: "delicious spaghetti",
            image: "uploads/spaghetti.jpg",
            average_score: "4.30",
            difficulty: "easy",
            preparation_time: "5 minutes",
            cooking_time: "30 minutes",
            instructions: JSON.stringify(['step1', 'step2', 'step3']),
            tools: JSON.stringify(["Skimmer and chef's knife", "Whisk and slotted spoon"]),
            servings: 4,
            user_id: 2,
            category_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate
        },
    ]
  
        recipes.forEach(recipe => {
          connection.query('INSERT INTO recipes (title, description, image, average_score, difficulty, preparation_time, cooking_time, instructions, tools, servings,  user_id, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [recipe.title, recipe.description, recipe.image, recipe.average_score, recipe.difficulty, recipe.preparation_time, recipe.cooking_time, recipe.instructions, recipe.tools, recipe.servings, recipe.user_id, recipe.category_id], 
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

    
}


module.exports = {recipeseeder}