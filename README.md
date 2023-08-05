# Employee Tracker

## Description
This application allows the user create employees, their roles, and their departments. Then the user can view this data as tables in the command line.

[Walkthrough Video](https://drive.google.com/file/d/1pxl-76ocn5GIDNpyPawAO8rRrWiWkQYI/view?usp=sharing)

## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/about)
* [MySQL](https://www.mysql.com/)
* [Inquirer](https://www.npmjs.com/package/inquirer#prompt)
* [MySQL 2](https://www.npmjs.com/package/mysql2)
* [CLI Table](https://www.npmjs.com/package/cli-table)


## Installation

To install necessary dependancies, run the following command: 

```
npm i
```
## Usage
First, the user has to download the repository from git hub and download dependencies. Then the user will have to start mysql in order to initialize the database and the seed.sql if they do not have any data themselves. To start the application, the user will type ```npm start``` into the command line and will be shown a list of options. The user will be able to view a table of departments, roles, and employees. They will also be able to add new departments, new roles, new employees, and update existing employees.

## Learning Points
* Using MySQL to create a database that can be referenced 
* Using the MySQL shell and workbench
* Incorporating the npm package CLI Table to create table 

## Important Code
```js
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
 };
```
Turns the SQL query into a promise and creates a table based on the query

## Author Info

### Timothy Su

* [LinkedIn](https://www.linkedin.com/in/timothysu1/)
* [Github](https://github.com/timothysu1)

## License

Please refer to license in the repo. 

## Contributions
An example of promisifying SQL queries:
https://stackoverflow.com/questions/54730641/node-js-how-to-apply-util-promisify-to-mysql-pool-in-its-simplest-way 

MySQL self join tutorial: 
https://www.mysqltutorial.org/mysql-self-join/ 