const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'business_db'
  }
);

class Tasks {
  constructor() {
  };

  viewDepartments(){
    const sql = 'SELECT *, name AS Department FROM department ';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      return rows;
    })
  };
};

module.exports = Tasks;