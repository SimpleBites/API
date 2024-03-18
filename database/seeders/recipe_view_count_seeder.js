const {pool, connection} = require("../mysql")
const bcrypt = require("bcrypt")


const recipeViewCountSeeder = () => {
    pool.getConnection(function(err, connection){

    
    const recipeViewCounts = [
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 1,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 1,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 1,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 1,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 1,
        },
    ]
  
        recipeViewCounts.forEach(viewcount => {
          connection.query('INSERT INTO recipe_view_count (view_count_total, view_count_day, recipe_id) VALUES (?, ?, ?)', 
            [viewcount.view_count_total, viewcount.view_count_day, viewcount.recipe_id], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  //connection.release();
                  console.error('Error inserting user', err);
                });
                return;
            }
        })
        console.log("recipe view count table seeded")
    })
    })
}
  

   
module.exports = {recipeViewCountSeeder}