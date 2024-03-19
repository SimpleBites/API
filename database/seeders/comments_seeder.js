const {pool, connection} = require("../mysql")
const bcrypt = require("bcrypt")


const commentseeder = () => {
   
    const comments = [
        {
            recipe_id: 1,
            user_id: 1,
            comment: "this was delicious",
            stars: 5
        },
        {
            recipe_id: 2,
            user_id: 1,
            comment: "delicious garbage",
            stars: 1
        },
        {
            recipe_id: 3,
            user_id: 1,
            comment: "meh",
            stars: 2.5
        },
        {
            recipe_id: 4,
            user_id: 2,
            comment: "very good",
            stars: 4
        },
        {
            recipe_id: 5,
            user_id: 3,
            comment: "alright",
            stars: 3
        },
    ]
  
        comments.forEach(comment => {
          connection.query('INSERT INTO comments (recipe_id, user_id, comment, stars) VALUES (?, ?, ?, ?)', 
            [comment.recipe_id, comment.user_id, comment.comment, comment.stars], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  connection.release();
                  console.error('Error inserting user', err);
                });
                return;
            }
        })
        console.log("comment table seeded")
    })
    }

  

   
module.exports = {commentseeder}