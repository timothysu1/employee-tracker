const inquirer = require("inquirer");
const mysql = require("mysql2");

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
            console.log(1);
            return this.run();
          case 'View All Roles':
            console.log(2);
            return this.run();
          case 'View All Employees':
            console.log(3);
            return this.run();
          case 'Add a Department':
            console.log(4);
            return this.run();
          case 'Add a Role':
            console.log(5);
            return this.run();
          case 'Add an Employee':
            console.log(6);
            return this.run();
          case 'Update an Employee Role':
            console.log(7);
            return this.run();
          case 'Quit':
            break;


        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}














module.exports = CommandLine;