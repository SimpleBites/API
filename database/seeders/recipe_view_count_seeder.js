const {pool, connection} = require("../mysql")
const moment = require("moment")

const recipeViewCountSeeder = () => {
    let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const recipeViewCounts = [
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            view_count_total: 200,
            view_count_day: 50,
            recipe_id: 2,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
    ]
  
        recipeViewCounts.forEach(viewcount => {
          connection.query('INSERT INTO recipe_view_count (view_count_total, view_count_day, recipe_id) VALUES (?, ?, ?)', 
            [viewcount.view_count_total, viewcount.view_count_day, viewcount.recipe_id], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  console.error('Error inserting user', err);
                });
                return;
            }
        })

        console.log("recipe view count table seeded")
    })

}

  

   
module.exports = {recipeViewCountSeeder}