const {pool, connection} = require("../mysql")
const moment = require("moment")
const ingredientseeder = () => {
    let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const ingredients = [
        {
            title: "carrot",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "tomato",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "sugar",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "salt",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "pepper",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
    ]
  
        ingredients.forEach(category => {
          connection.query('INSERT INTO ingredients (title) VALUES (?)', 
            [category.title], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  console.error('Error inserting ingredients', err);
                });
                return;
            }

        })

        console.log("ingredient table seeded")
    })
    }

module.exports = {ingredientseeder}