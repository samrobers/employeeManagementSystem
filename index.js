//Create a Database with 3 tables
//department id INT PRIMARY KEY
//name VARCHAR(30) to hold a department name
//role id INT PRIMARY KEY title VARCHAR(30) salary DECIMAL to hold role salary department_id Int

//use inquirer to create question sets

const inquirer = "inquirer";

const addView = [
  {
    input: "rawlist",
    choices: ["Add", "View", "Exit"],
    message:
      "Would you like to add or view to the following:departments, roles, employees",
    name: "addViewName",
  },
];

const add = [
  {
    input: "rawlist",
    choices: ["department", "role", "employee"],
    message: "Which of the following would you like to create new?",
    name: "addName",
  },
];

const view = [
  {
    input: "rawlist",
    choices: ["department", "role", "employee"],
    message: "Which of the following would you like to view",
    name: "viewName",
  },
];

inquirer.prompt(view);
