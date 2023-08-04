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
            tasks.viewDepartments().then(() => {
              return this.run();
            });
            break;

          case 'View All Roles':
            tasks.viewRoles().then(() => {
              return this.run();
            })
            break;

          case 'View All Employees':
            tasks.viewEmployees().then(() => {
              return this.run();
            });
            break;

          case 'Add a Department':
            tasks.addDepartments().then(() => {
              return this.run();
            });
            break;

          case 'Add a Role':
            tasks.addRole().then(() => {
              return this.run();
            });
            break;

          case 'Add an Employee':
            tasks.addEmployee.then(() => {
              return this.run();
            });
            break;

          case 'Update an Employee Role':
            tasks.updateRole.then(() => {
              return this.run();
            });
            break;

          case 'Quit':
            process.exit(0);
        }

      });
  }
}
module.exports = CommandLine;