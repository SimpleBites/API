const {pool, connection} = require("../mysql")
const moment = require("moment")


const commentseeder = () => {
    let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    const comments = [
        {
            recipe_id: 3,
            user_id: 1,
            comment: "this was delicious",
            stars: 5,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            recipe_id: 2,
            user_id: 1,
            comment: "delicious garbage",
            stars: 1,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            recipe_id: 2,
            user_id: 1,
            comment: "meh",
            stars: 2.5,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            recipe_id: 2,
            user_id: 2,
            comment: "very good",
            stars: 4,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            recipe_id: 2,
            user_id: 3,
            comment: "alright",
            stars: 3,
            created_at: formattedDate,
            updated_at: formattedDate,
        },
    ]
  
        comments.forEach(comment => {
          connection.query('INSERT INTO comments (recipe_id, user_id, comment, stars) VALUES (?, ?, ?, ?)', 
            [comment.recipe_id, comment.user_id, comment.comment, comment.stars], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  
                  console.error('Error inserting user', err);
                });
                return;
            }
        })
        console.log("comment table seeded")
    })
    }

  

   
module.exports = {commentseeder}