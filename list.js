//Create a Database with 3 tables
//department id INT PRIMARY KEY
//name VARCHAR(30) to hold a department name
//role id INT PRIMARY KEY title VARCHAR(30) salary DECIMAL to hold role salary department_id Int

//use inquirer to create question sets
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "31427",
  database: "employeeTracker_db",
});

const inquirer = require("inquirer");
require("console.table");
const start = () => {
  inquirer
    .prompt([
      {
        name: "startInit",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update employee roles",
        ],
      },
    ])
    .then((response) => {
      switch (response.startInit) {
        case "View All Employees":
          viewEmp();
          break;
        case "View All Departments":
          viewDep();
          break;
        case "View All Roles":
          viewRole();
          break;
        case "Add Employee":
          addEmp();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDep();
          break;
        case "Update employee roles":
          updateEmpRole();
          break;
      }
    });

  //we need a switch case here to handle the different choices and what functions will be called to speak to the DB
};

const viewEmp = () => {
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
};
const viewDep = () => {
  connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
};
const viewRole = () => {
  connection.query("SELECT * FROM role", (err, data) => {
    if (err) throw err;
    console.table(data);
    start();
  });
};
const addEmp = () => {
  connection.query("SELECT * FROM employee", (err, empData) => {
    if (err) throw err;
    const newEmpData = empData.map((emp) => {
      return {
        name: emp.first_name + " " + emp.last_name,
        value: emp.id,
      };
    });

    connection.query("SELECT * FROM role", (err, roleData) => {
      if (err) throw err;
      const newRoleData = roleData.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      inquirer
        .prompt([
          {
            name: "firstName",
            message: "What is the new employees first name?",
          },
          {
            name: "lastName",
            message: "what is the new employees last name?",
          },
          {
            name: "manName",
            type: "list",
            message: "Choose the employees manager",
            choices: newEmpData,
          },
          {
            name: "roleName",
            type: "list",
            message: "Choose a role title",
            choices: newRoleData,
          },
        ])
        .then((response) => {
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
            [
              response.firstName,
              response.lastName,
              response.roleName,
              response.manName,
            ],
            (err, data) => {
              if (err) throw err;
              console.log("Your employee has been added");
              start();
            }
          );
        });
    });
  });
};
const addRole = () => {
  connection.query("SELECT * FROM department", (err, depData) => {
    if (err) throw err;
    console.log(depData, "before");
    const newDepData = depData.map((dep) => {
      return {
        name: dep.name,
        value: dep.id,
      };
    });
    console.log(newDepData, "after");

    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "What is the name of the role you would like to create?",
        },
        {
          name: "newSalary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "depId",
          type: "list",
          message: "Choose the following department",
          choices: newDepData,
        },
      ])
      .then((response) => {
        connection.query(
          "INSERT INTO role(title, salary, department_id) VALUES(?,?,?)",
          [response.newRole, response.newSalary, response.depId],
          (err, data) => {
            if (err) throw err;
            console.log("Your new data has been added");
            start();
          }
        );
      });
  });
};
const addDep = () => {
  inquirer
    .prompt([
      {
        name: "newDep",
        type: "input",
        message:
          "What is the name of the new department you would like to add?",
      },
    ])
    .then((response) => {
      connection.query(
        "INSERT INTO department(name) VALUES(?)",
        response.newDep,
        (err, data) => {
          console.log("New Department has been added");
          start();
        }
      );
    });
};
const updateEmpRole = () => {
  connection.query("UPDATE role_id WHERE EMPLOYEE");
};

// const remove = () => {
//   inquirer.prompt([
//     {
//       name: "removeEmp",
//       type: "list",
//       message: "What employee would you like to remove?",
//       //This choices needs a function to be able to call a connection to grab the info from the db
//       choices: ["PlaceHolder"],
//     },
//   ]);
// };

// const add = () => {
//   inquirer
//     .prompt([
//       {
//         name: "firstName",
//         message: "What is the new employees first name?",
//       },
//     ])
//     .then(() => {
//       inquirer.prompt([
//         {
//           name: "lastName",
//           message: "what is the new employees last name?",
//         },
//       ]);
//     });
// };

start();

//**Arrays Of Prompt Questions**//
// const addView = [
//   {
//     type: "rawlist",
//     choices: ["Add", "View", "Exit"],
//     message:
//       "Would you like to add or view to the following:departments, roles, employees",
//     name: "addViewName",
//   },
// ];

// const add = () => {
//   inquirer.prompt([
//     {
//       type: "rawlist",
//       choices: ["department", "role", "employee"],
//       message: "Which of the following would you like to create new?",
//       name: "addName",
//     },
//   ]);
// };

// const view = () => {
//   inquirer.prompt([
//     {
//       type: "rawlist",
//       choices: ["department", "role", "employee"],
//       message: "Which of the following would you like to view",
//       name: "viewName",
//     },
//   ]);
// };

// const start = () => {
//   inquirer.prompt(addView).then((answer) => {
//     if (answer.addViewName === "View") {
//       add();
//     } else if (answer.addViewName === "Add") {
//       view();
//     } else {
//       return "You selected to exit";
//     }
//   });
// };

module.exports = start;
