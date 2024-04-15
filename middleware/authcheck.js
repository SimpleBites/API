const session = require("express-session")

const authCheck = (req,res,next) => {

    const response = fetch('http://localhost:4000/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: "include"
      });

      const data = response.json()
      console.log(data)

    }

module.exports = {authCheck}
