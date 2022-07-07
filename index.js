const inquirer = require ('inquirer');
const mysql = require ('mysql2');
const db = mysql.createConnection (
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "tracker_db"
    }
)

function allfunctions(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewAll',
            message: 'choose option',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role",
        "quit"]
        }
        
        
        
        ])
        
        .then((Response)=>{
           if (Response.viewAll==="view all departments"){
               getDeparment()
           } else if (Response.viewAll==="view all roles"){
               viewAllRoles()
           } else if (Response.viewAll==="view all employees"){
               //create a function to view all employees
           } else if (Response.viewAll==="add a department"){
              addDeparment()
           } else if (Response.viewAll==="add a role"){
               //create a function to add a role
           } else if (Response.viewAll==="add an employee"){
               //create a function to add an employee
           } else if (Response.viewAll==="update an employee role"){
               //create a function to update an employee
           } else {
               db.end()
           }
        
             
        })
}

function getDeparment(){
    db.query('SELECT id,name FROM department', function (err, results) {
        if (err){
            throw err
        }
    console.table(results);
    allfunctions()
  });
}

function viewAllRoles(){
    db.query('SELECT role.id,title,salary,name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
        if (err){
            throw err
        }
    console.table(results);
    allfunctions()
})}

function addDeparment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'type department name',
        }
    ]) .then(response => {
        db.query('INSERT INTO department(name) VALUES (?)', response.department,(err, results) => {
            if (err){
                throw err
            }
            console.log("department added successfully")
            allfunctions()
        })
    })
}

allfunctions()