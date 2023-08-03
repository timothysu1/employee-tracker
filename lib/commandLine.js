const inquirer = require("inquirer");
const mysql = require("mysql2");
const Tasks = require('./tasks');

const tasks = new Tasks();

class CommandLine {
  constructor() {
  }
  run() {
    return inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Quit'],
          loop: true
        }
      ])
      .then((response) => {
        switch (response.choice) {
          case 'View All Departments':
            tasks.viewDepartments();

            return this.run();

          case 'View All Roles':
            tasks.viewRoles;
            return this.run();
          case 'View All Employees':
            tasks.viewEmployees;
            return this.run();
          case 'Add a Department':
            tasks.addDepartments;
            return this.run();
          case 'Add a Role':
            tasks.addRole();
            return this.run();
          case 'Add an Employee':
            tasks.addEmployee;
            return this.run();
          case 'Update an Employee Role':
            tasks.updateRole;
            return this.run();
          case 'Quit':
            break;
        }

      });
  }
}
module.exports = CommandLine;