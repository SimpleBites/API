const express = require("express")
const {pool, connection} = require("./database/mysql")
const app = new express()

app.use(express.json())
const searchExample = ["searchexample1 => /api/users/uservalue(check if value is in any column row and get result)", "searchexample2 => /api/users/username=admin"]

app.get("/home", ((req,res) => {
    res.send("<a href='/api/users'>user API</a>")
}))

app.get("/api/users", ((req,res) => {
    connection.query("Select * from users", ((err,results) => {
        if(err){
            console.log(err)
        }
        res.send([searchExample, results])
    }))
}))

app.get("/api/users/:uservalue", ((req,res) => {
    
    pool.getConnection((err, connection) => {
        let searchTerm = req.params.uservalue

        if(searchTerm.match("=")){
            console.log("works")
            let variable = searchTerm.split("=")
            let sqlquery = "SELECT * FROM users WHERE " + variable[0] + " LIKE " + "'%" + variable[1] + "%'"
    
            connection.query(sqlquery, ((err,results) => {
                if(err){
                    console.log(err)
                    connection.release()
                }

                if(results.length == 0){
                    let error = ["Could not find that value in table"]
                    res.send([searchExample, error])
                    
                } else{
                    res.send([searchExample, results])
                }
            }))
        } 
        else{
            let sqlquery = "SELECT * FROM users WHERE id LIKE" + " '%" + searchTerm + "%'" + " or username LIKE" + " '%" + searchTerm + "%' " + " OR user_image LIKE" + " '%" + searchTerm + "%'" + " OR email LIKE" + " '%" + searchTerm + "%'";
    
            connection.query(sqlquery, ((err,results) => {
                if(err){
                    console.log(err)
                }
    
                if(results.length == 0){
                    let error = ["Could not find that value in table"]
                    res.send([searchExample, error])
                } 
                else{
                    res.send([searchExample, results])
                }
            }))
        }
    })
}))

app.use("*", ((req,res) => {
    res.status(404).send("<h1>Resource not found</h1>")
}))

app.listen(5000, () => {
    console.log("Server listening on port: 5000")
})