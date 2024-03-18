const {pool, connection} = require("../mysql")

const categoryseeder = () => {
    pool.getConnection(function(err, connection){
    const categories = [
        {
            title: "dessert",
        },
        {
            title: "dining",
        },
        {
            title: "snack",
        },
        {
            title: "breakfast",
        },
        {
            title: "lunch",
        },
    ]
  
        categories.forEach(category => {
          connection.query('INSERT INTO recipe_categories (title) VALUES (?)', 
            [category.title], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  connection.release();
                  console.error('Error inserting categories', err);
                });
                return;
            }

        })

        console.log("category table seeded")
    })
    })
}
module.exports = {categoryseeder}