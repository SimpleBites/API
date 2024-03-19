const {pool, connection} = require("../mysql")
const bcrypt = require("bcrypt")

/*const deleteUsers = () => {
    connection.query("TRUNCATE TABLE users", (err, results) => {
        if(err){
            console.log(err)
        }

        console.log(results)
    })
}

deleteUsers()*/

const userseeder = () => {
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync("welkom123", saltRounds);
    
    const users = [
        {
            username: "admin",
            user_image: "preset.png",
            email: "admin@gmail.com",
            password: hashedPassword
        },
        {  
            username: "users",
            user_image: "preset.png",
            email: "user@gmail.com",
            password: hashedPassword
        },
        {
            username: "jur",
            user_image: "preset.png",
            email: "jur@gmail.com",
            password: hashedPassword
        }, {  
            username: "thomas",
            user_image: "preset.png",
            email: "thomas@gmail.com",
            password: hashedPassword
        }, {  
            username: "cerchio",
            user_image: "preset.png",
            email: "cerchio@gmail.com",
            password: hashedPassword
        },
    ]
  
        users.forEach(user => {
          connection.query('INSERT INTO users (username, user_image, email, password) VALUES (?, ?, ?, ?)', 
            [user.username, user.user_image, user.email, user.password], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                  connection.release();
                  console.error('Error inserting user', err);
                });
                return;
            }
        })

        console.log("user table seeded")
    })
}

 

   
module.exports = { userseeder}