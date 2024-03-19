const express = require("express")
const {pool, connection} = require("./database/mysql")
const qs = require("qs")
const assert = require("assert")
var pagination = require('pagination');

const app = new express()

const qsOptions = {
    depth:4,
    parameterlimit: 10
}

app.use(express.json())
const searchExample = ["searchexample1 => /api/users/uservalue(check if value is in any column row and get result)", "searchexample2 => /api/users/username=admin"]

app.get("/home", ((req,res) => {
    res.write("<a href='/api/users'>user API</a><br>")
    res.write("<a href='/api/recipes'>recipe API</a><br>")
    res.write("<a href='/api/ingredients'>ingredients API</a><br>")
    res.write("<a href='/api/recipeviewcount'>recipe view count API</a><br>")
    res.write("<a href='/api/recipe-ingredients'>recipe ingredients API</a><br>")
    res.write("<a href='/api/comments'>comments API</a>")
    res.end()
}))

app.get("/api/users", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM users", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM users LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/recipes", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM recipes", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM recipes LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/ingredients", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM ingredients", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM ingredients LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/recipeviewcount", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM recipe_view_count", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM recipe_view_count LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/recipe-ingredients", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM recipe_ingredients", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM recipe_ingredients LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/recipecategories", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM recipe_categories", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM recipe_categories LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/comments", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
  
    const offset = (page - 1) * pageSize;
  
    connection.query("SELECT COUNT(*) AS count FROM comments", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error fetching total count');
      }
  
      const totalCount = data[0].count;
  
      connection.query("SELECT * FROM comments LIMIT ? OFFSET ?", [pageSize, offset], (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Error fetching users');
        }
  
        res.send({
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}))

app.get("/api/users/:uservalue", ((req,res) => {
    let searchTerm = req.params.uservalue
    console.log(req.query)
    var obj = qs.parse(req.params.uservalue, qsOptions)
    assert.deepEqual(obj, {a: "c"})

    var str = qs.stringify(obj)
    assert.equal(str, "a=c")
    console.log(str)


    /*if(searchTerm.match("=")){
        console.log("works")
        let variable = searchTerm.split("=")
        let sqlquery = "SELECT * FROM users WHERE " + variable[0] + " LIKE " + "'%" + variable[1] + "%'"
    
        connection.query(sqlquery, ((err,results) => {
            if(err){
                console.log(err)
                connection.end()
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
    }*/
}))

app.use("*", ((req,res) => {
    res.status(404).send("<h1>Resource not found</h1>")
}))

app.listen(5000, () => {
    console.log("Server listening on port: 5000")
})