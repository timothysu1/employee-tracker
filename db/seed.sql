INSERT INTO department (name)
VALUES ("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead", 100000, 4),
("Layer", 200000,3),
("Accountant",125000,2),
("Software Engineering",120000,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John", "Smith",1,null),
("Josh", "Lee", 2 , 1);