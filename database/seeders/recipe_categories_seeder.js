const {pool, connection} = require("../mysql")
const moment = require("moment")

const categoryseeder = () => {
    let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const categories = [
        {
            title: "dessert",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "dining",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "snack",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "breakfast",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            title: "lunch",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
    ]
  
        categories.forEach(category => {
          connection.query('INSERT INTO recipe_categories (title) VALUES (?)', 
            [category.title], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                 
                  console.error('Error inserting categories', err);
                });
                return;
            }

        })

        console.log("category table seeded")
    })
}

module.exports = {categoryseeder}