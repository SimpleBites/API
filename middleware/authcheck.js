const session = require("express-session")

const authCheck = (async (req,res,next) => {
    const response = await fetch('http://localhost:4000/session', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
        credentials: "include"
      });

      const data = await response.json()
      console.log(data)
      if(data.username){
        next()
      }
      else{
        res.status(401).send("<h1>Unauthorized</h1>")
      }
})

module.exports = {authCheck}
