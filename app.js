const express = require("express")
const {pool, connection} = require("./database/mysql")
const qs = require("qs")
const assert = require("assert")
const {authCheck} = require("./middleware/authcheck")
const app = new express()
const cors = require("cors")
const path = require("path")
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4000"],
  credentials: true, // Allow only this origin to access the resources
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

const qsOptions = {
    depth:4,
    parameterlimit: 10
}

app.use(express.json())
app.use(cors(corsOptions))

const meta = ["Navigation => /api/users?page=3","searchexample1 => /api/users/userID(check if ID exists in database)", "searchexample2 => /api/users?username=admin"]

app.get("/session", async (req, res) => {
  try {
    // Use await to wait for the fetch operation to complete
    const response = await fetch('http://localhost:4000/session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    // Use await to wait for the JSON conversion to complete
    const data = await response.json();
    console.log(data);

    // Send back the data to the client or handle it however you need
    res.json(data);

  } catch (error) {
    console.error(error);
    // Handle the error appropriately
    res.status(500).send('An error occurred while fetching session data.');
  }
});

app.get("/home", ((req,res) => {
    res.write("<a href='/api/users'>user API</a><br>")
    res.write("<a href='/api/recipes'>recipe API</a><br>")
    res.write("<a href='/api/ingredients'>ingredients API</a><br>")
    res.write("<a href='/api/recipeviewcount'>recipe view count API</a><br>")
    res.write("<a href='/api/recipe-ingredients'>recipe ingredients API</a><br>")
    res.write("<a href='/api/comments'>comments API</a>")
    
    res.end()
}))

app.get("/images/:image", ((req,res) => {
 
  res.sendFile(path.resolve(`${__dirname}/uploads/${req.params.image}`))
}))

app.get("/api/users", authCheck, ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
    const offset = (page - 1) * pageSize;
  
    
    
        const {limit} = req.query
        var obj = qs.parse(req.query, qsOptions)
       
    
        var str = qs.stringify(obj)
        

        let urlquery = str.split("=")
        let sqlquery = "SELECT * from users WHERE username = ? OR WHERE email = ?"

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

        
        const newResults = results
        const coolresults = newResults.map(result => {
          
        })
  
        res.send({
          meta,
          page,
          pageSize,
          totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          data: results
        });
        res.end();
      });
    });
}
))

app.get("/api/users/:userID", ((req,res) => {
    console.log(req.params.userID)
    const userid = req.params.userID
    connection.query("Select * from users where id = ?",userid, ((err,results) => {
        if(err){
            console.log(err)
        }

        res.send([meta, results])
    }))
}))

app.get("/api/recipes/:recipeID", ((req,res) => {
  console.log(req.params.recipeID)
  const recipeId = req.params.recipeID
  connection.query("Select * from recipes where id = ?",recipeId, ((err,results) => {
      if(err){
          console.log(err)
      }

      res.send(results)
  }))
}))

app.get("/api/recipes", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
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
          meta,
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

app.get("/api/recipes/:recipeID", ((req,res) => {
    console.log(req.params.recipeID)
    const recipeid = req.params.recipeID
    connection.query("Select * from recipes where id = ?",recipeid, ((err,results) => {
        if(err){
            console.log(err)
        }

        res.send(results)
    }))
}))

app.get("/api/ingredients", ((req,res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
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
        meta,
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
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
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
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
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
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
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
    const pageSize = parseInt(req.query.pageSize, 15) || 15;
  
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
}))

app.use("*", ((req,res) => {
    res.status(404).send("<h1>Resource not found</h1>")
}))

app.listen(5000, () => {
    console.log("Server listening on port: 5000")
})