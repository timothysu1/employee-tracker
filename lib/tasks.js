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
      const query = util.promisify(db.query).bind(db);
      const rows = await query(sql);

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
      const sql = `SELECT role.id,role.title,role.salary,department.name FROM role JOIN department ON role.department_id = department.id`;

      const query = util.promisify(db.query).bind(db);
      const rows = await query(sql);
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

  async viewEmployees() {
    try {
      const sql = `SELECT e.first_name,
      e.last_name,
      CONCAT(m.first_name, ' ',m.last_name )AS manager_name,
      e.id,role.title,role.salary,department.name
      FROM employee e
      LEFT JOIN role
      ON role_id = role.id
      JOIN department
      ON department_id = department.id
      LEFT JOIN employee m
      ON e.manager_id = m.id`;

      const query = util.promisify(db.query).bind(db);
      const rows = await query(sql);
      console.log(rows)
      const table = new Table({
        head: ['id', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager']
      });
      rows.forEach(row => {
        let manager;
        if (row.manager_name === null) {
          manager = "null"
        } else {
          manager = row.manager_name
        }

        table.push([row.id, row.first_name, row.last_name, row.title, row.name, row.salary, manager]);
      });
      console.log("\n" + table.toString());
    }
    catch (err) {
      console.log(err);
    }
  };

  async addDepartments() {
    try {
      const response = await inquirer.prompt([
        {
          type: 'input',
          name: 'newDepartment',
          message: 'What is the name of the department?'
        }
      ]);
  
      const params = response.newDepartment;
      const sql = `INSERT INTO department(name) VALUES (?)`;
  
      const queryAsync = util.promisify(db.query).bind(db);
      await queryAsync(sql, params);
      console.log(`Added ${params} to the database`);
    } catch (err) {
      console.log(err);
    }
  }

  async addRole() {
    try {
      const sql1 = 'SELECT name,id FROM department';
      const query = util.promisify(db.query).bind(db);
      const rows = await query(sql1);
      const deptList =[];
      rows.forEach(row => {
        deptList.push(row.name);
      })
      const response = await inquirer.prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'What is the name of the Role?'
        },
        {
          type: 'input',
          name: 'newSalary',
          message: `How much is the role's salary?`
        },
        {
          type: 'list',
          name: 'dept',
          message: 'What Department does it belong to?',
          choices: deptList
        }
      ]);
      const department = rows.filter(obj => {
        return obj.name == response.dept
      })
      const deptID = department[0].id;
      const params = [response.newRole,response.newSalary,deptID];
      const sql2 = `INSERT INTO role(title,salary,department_id) VALUES (?,?,?)`;
  
      const queryAsync = util.promisify(db.query).bind(db);
      await queryAsync(sql2, params);
      console.log(`Added ${response.newRole} to the database`); 
    } catch (err) {
      console.log(err);
    }
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