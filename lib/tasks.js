const util = require('util');
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
  async viewDepartments() {
    try {
      const sql = 'SELECT name,id FROM department';
      const queryAsync = util.promisify(db.query).bind(db);
      const rows = await queryAsync(sql);

      const table = new Table({
        head: ['id', 'Departments']
      });
      rows.forEach(row => {
        table.push([row.id, row.name]);
      });

      console.log("\n" + table.toString());
    } catch (err) {
      console.log(err);
    }
  }

  async viewRoles() {
    try {
      const sql = 'SELECT role.id,role.title,role.salary,department.name FROM role JOIN department ON role.department_id = department.id';

      const queryAsync = util.promisify(db.query).bind(db);
      const rows = await queryAsync(sql);
      //console.log(rows)
      const table = new Table({
        head: ['id', 'Role', 'Department', 'Salary']
      });
      rows.forEach(row => {
        table.push([row.id, row.title, row.name, row.salary]);
      });
      console.log("\n" + table.toString());
    } catch (err) {
      console.log(err);
    }
  };
  viewEmployees() {
    const sql = 'SELECT first_name AS First Name FROM employee';

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
    })
  };
  addDepartments() {
    const sql = '';

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
    })
  };
  addRole() {
    const sql = '';

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
    })
  };
  addEmployee() {
    const sql = '';

    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
    })
  };
  updateRole() {
    return inquirer
      .prompt([

      ])
      .then((response) => {

      })
    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const param = [role, employee];

    db.query(sql, param, (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.log(rows);
    })
  };
};

module.exports = Tasks;