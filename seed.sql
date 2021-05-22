CREATE DATABASE employeeTracker_db;
USE employeeTracker_db;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30), --to hold department name--
)

CREATE TABLE employee (
    id PRIMARY KEY,
    first_name VARCHAR(30),--employee first name--
    last_name VARCHAR(30),--employee last name--
    role_id INT, --to hold reference to role of emp--
    manager_id INT --ref to another emp that manages the employee being created--
)

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(30), --to hold role title--
    salary DECIMAL, --
)