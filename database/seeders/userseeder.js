const {pool, connection} = require("../mysql")
const crypto = require("crypto")
const moment = require("moment")

const userseeder = () => {
        let formattedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const password = "welkom"
        const salt = crypto.randomBytes(16).toString("hex")
        const iterations = 10000; 
        const keyLength = 64;  
        const digest = 'sha512';  
        const hash = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
        const users = [
        {
            username: "admin",
            user_image: "uploads/preset.png",
            email: "admin@gmail.com",
            password: hash,
            salt: salt,
            role: "user",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {  
            username: "users",
            user_image: "uploads/preset.png",
            email: "user@gmail.com",
            password: hash,
            salt: salt,
            role: "user",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
        {
            username: "jur",
            user_image: "preset.png",
            email: "jur@gmail.com",
            password: hash,
            salt: salt,
            role: "user",
            created_at: formattedDate,
            updated_at: formattedDate,
        }, {  
            username: "thomas",
            user_image: "preset.png",
            email: "thomas@gmail.com",
            password: hash,
            salt: salt,
            role: "user",
            created_at: formattedDate,
            updated_at: formattedDate,
        }, {  
            username: "cerchio",
            user_image: "preset.png",
            email: "cerchio@gmail.com",
            password: hash,
            salt: salt,
            role: "user",
            created_at: formattedDate,
            updated_at: formattedDate,
        },
    ]
  
        users.forEach(user => {
          connection.query('INSERT INTO users (username, user_image, email, password, salt, role) VALUES (?, ?, ?, ?, ?, ?)', 
            [user.username, user.user_image, user.email, user.hash, user.salt, user.role], 
            (err, results) => {
              if(err) {
                connection.rollback(() => {
                 
                  console.error('Error inserting user', err);
                });
                return;
            }
        })

        console.log("user table seeded")
    })
}


module.exports = { userseeder}