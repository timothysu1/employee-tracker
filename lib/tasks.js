const inquirer = require("inquirer");
const mysql = require("mysql2");
var Table = require('cli-table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'business_db'
  },
  console.log(`Connected to the courses_db database.`)
);



class Tasks {
  constructor() {
  };



    viewDepartments(){
    const sql = 'SELECT name AS Department FROM department';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  viewRoles(){
    const sql = 'SELECT title AS roles FROM roles';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  viewEmployees(){
    const sql = 'SELECT first_name AS First Name FROM employee';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  addDepartments(){
    const sql = '';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  addRole(){
    const sql = '';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  addEmployee(){
    const sql = '';
    
    db.query(sql,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
  updateRole(role,employee){
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const param = [role,employee];

    db.query(sql,param,(err,rows) => {
      if (err){
        console.log(err);
      }
      console.log(rows);
    })
  };
};

module.exports = Tasks;