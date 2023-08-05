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
      const deptList = [];
      rows.forEach(row => {
        deptList.push(row.name);
      });
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
      const params = [response.newRole, response.newSalary, deptID];
      const sql2 = `INSERT INTO role(title,salary,department_id) VALUES (?,?,?)`;

      const queryAsync = util.promisify(db.query).bind(db);
      await queryAsync(sql2, params);
      console.log(`Added ${response.newRole} to the database`);
    } catch (err) {
      console.log(err);
    }
  };

  async addEmployee() {
    try {
      const sql1 = 'SELECT title,id FROM role';
      const query1 = util.promisify(db.query).bind(db);
      const rows1 = await query1(sql1);
      const roleList = [];
      rows1.forEach(row => {
        roleList.push(row.title);
      });

      const sql2 = 'SELECT id, CONCAT(first_name," ",last_name)AS name FROM employee';
      const query2 = util.promisify(db.query).bind(db);
      const rows2 = await query2(sql2);
      const managerList = ['null'];
      rows2.forEach(row => {
        managerList.push(row.name);
      });
      const response = await inquirer.prompt([
        {
          type: 'input',
          name: 'first',
          message: `What is the employee's first name?`
        },
        {
          type: 'input',
          name: 'last',
          message: `What is the employee's last name?`
        },
        {
          type: 'list',
          name: 'role',
          message: `What is the employee's role?`,
          choices: roleList
        },
        {
          type: 'list',
          name: 'manager',
          message: `Who is the employee's manager?`,
          choices: managerList
        },
      ]);
      const role = rows1.filter(obj => {
        return obj.title == response.role
      })
      const roleID = role[0].id;

      let manager;
      let managerID;
      if (response.manager !== 'null') {
        manager = rows2.filter(obj => {
          return obj.name == response.manager
        })
        managerID = manager[0].id;
      } else {
        managerID = null
      }
      const params = [response.first, response.last, roleID, managerID];
      const sql3 = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
      const queryAsync = util.promisify(db.query).bind(db);
      await queryAsync(sql3, params);
      console.log(`Added ${response.first} ${response.last} to the database`);
    }
    catch (err) {
      console.log(err);
    }
  };


  async updateRole() {
    try {
      const sql1 = 'SELECT id, CONCAT(first_name," ",last_name)AS name FROM employee';
      const query1 = util.promisify(db.query).bind(db);
      const rows1 = await query1(sql1);
      const empList = [];
      rows1.forEach(row => {
        empList.push(row.name);
      });
      const sql2 = 'SELECT title,id FROM role';
      const query2 = util.promisify(db.query).bind(db);
      const rows2 = await query2(sql2);
      const roleList = [];
      rows2.forEach(row => {
        roleList.push(row.title);
      });
      const response = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: `Which employee's role do you want to update?`,
          choices: empList
        },
        {
          type: 'list',
          name: 'role',
          message: `What is the employee's new role?`,
          choices: roleList
        },
      ]);
      const employee = rows1.filter(obj => {
        return obj.name == response.employee
      });
      const empID = employee[0].id;
      const role = rows2.filter(obj => {
        return obj.title == response.role
      });
      const roleID = role[0].id;
      const params = [roleID,empID];
      const sql3 = `UPDATE employee
      SET role_id = ?
      Where id = ?`;
      const queryAsync = util.promisify(db.query).bind(db);
      await queryAsync(sql3, params);
      console.log(`Updated ${response.employee}'s roles`);
    }
    catch (err) {
      console.log(err);
    }
  };
};

module.exports = Tasks;