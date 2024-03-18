const {pool, connection} = require("../mysql")

const ingredientseeder = () => {
    pool.getConnection(function(err, connection){
    const ingredients = [
        {
            title: "carrot",
        },
        {
            title: "tomato",
        },
        {
            title: "sugar",
        },
        {
            title: "salt",
        },
        {
            title: "pepper",
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
    })
}
module.exports = {ingredientseeder}