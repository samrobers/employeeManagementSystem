use employeeTracker_db;
INSERT INTO department( name) VALUES 
( "Sales"), ( "Finance"),("Development"),(
"Warehouse");
INSERT INTO role(title, salary, department_id) VALUES 
("Manager", "100000",4), ("Sales Lead","30000",1);

INSERT INTO employee (first_name, last_name, role_id) VALUES 
("John", "Doe", 1),
("Jane", "Doe", 2),
 ("Jack", "Dane", 2);
 
 UPDATE employee SET manager_id = 1 WHERE id=2;
 UPDATE employee SET manager_id = 1 WHERE id=3;
 



