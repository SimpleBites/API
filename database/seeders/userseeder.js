const {pool, connection} = require("../mysql")
const bcrypt = require("bcrypt")

const saltRounds = 10;
const hashedPassword = bcrypt.hashSync("welkom123", saltRounds);

const users = [
    {
        id:1,
        username: "admin",
        user_image: "preset.png",
        email: "admin@gmail.com",
        password: hashedPassword
    },
    {   id:2,
        username: "users",
        user_image: "preset.png",
        email: "user@gmail.com",
        password: hashedPassword
    },
    {
        id:3,
        username: "jur",
        user_image: "preset.png",
        email: "jur@gmail.com",
        password: hashedPassword
    }
] 

pool.getConnection(function(err, connection){
    connection.query('INSERT INTO users SET ?', users, (err, results, fields) => {
        if(err){
            console.log(err)
        }
    }) 
    connection.release()       

});