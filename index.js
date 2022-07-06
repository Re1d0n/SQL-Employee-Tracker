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
inquirer.prompt([
{
    type: 'list',
    name: 'viewAll',
    message: 'choose option',
    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
}



])

.then((Response)=>{
   if (Response.viewAll==="view all departments"){
       //create a function to get the departments
   } else if (Response.viewAll==="view all roles"){
       //create a function to view all roles
   } else if (Response.viewAll==="view all employees"){
       //create a function to view all employees
   } else if (Response.viewAll==="add a department"){}
})
