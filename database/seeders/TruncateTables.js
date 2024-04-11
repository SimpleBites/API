const {pool,connection} = require("../mysql")

function truncateTables(callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err; // Handle error
  
      // Disable foreign key checks to allow truncation
      connection.query('SET FOREIGN_KEY_CHECKS = 0', (err) => {
        if (err) return callback(err, null);
  
        // Perform truncation queries
        const tablesToTruncate = [
          'comments',
          'recipe_ingredients',
          'recipe_view_count',
          'recipes',
          'ingredients',
          'recipe_categories',
          'users',
        ];
        const truncateQueries = tablesToTruncate.map(table => `TRUNCATE TABLE ${table};`).join(' ');
  
        connection.query(truncateQueries, (err) => {
          // Re-enable foreign key checks
          connection.query('SET FOREIGN_KEY_CHECKS = 1', (fkErr) => {
            connection.release();
            if (err || fkErr) {
              return callback(err || fkErr, null);
            }
            return callback(null, 'All tables truncated successfully');
          });
        });
      });
    });
  }
  
  // Call the function
  truncateTables((err, result) => {
    if (err) {
      console.error('Failed to truncate tables:', err);
    } else {
      console.log(result);
    }
  });