var connection = require("../config/connection");

//helper functions

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

//end helper functions

var orm = {
  selectAll: function(tableInput, cb) {
    var queryString = `select * from ${tableInput};`;
    console.log(`inside orm:selectAll, here's the querystring: ${queryString}`);
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },

  insertOne: function(table, cols, vals, cb) {
    var queryString = `insert into ${table} (${cols.toString()})
      values (${printQuestionMarks(vals.length)})`;

    console.log(
      `inside orm.js, insertOne method, here's the queryString: `,
      queryString
    );

    console.log(
      `from inside insertOne inside the orm, here's the vals going into the query: ${vals}`
    );

    connection.query(queryString, vals, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },

  updateOne: function(table, objColVals, condition, cb) {
    console.log(
      `inside orm.js, updateOne method, here's the objColVals: `,
      objColVals
    );
    console.log(
      `inside orm.js, updateOne method, here's the condition:`,
      condition
    );
    var queryString = `update ${table} set ${objToSql(
      objColVals
    )} where ${condition}`;

    console.log(
      `inside orm.js, updateOne method, here's the queryString:`,
      queryString
    );
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },

  deleteOne: function(table, condition, cb) {
    var queryString = `delete from ${table} where ${condition}`;

    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
};
module.exports = orm;
