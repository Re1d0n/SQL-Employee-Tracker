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

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'type employee first name',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'type employee last name',
        }, 
    ]) .then(response => {
        let firstName = response.firstName;
        let lastName = response.lastName
        findRoles().then(([roles]) => {
            const dbRoles= roles.map(role =>({
                name :role.title
            }))
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'choose employee role',
                    choices: dbRoles
                }, 
            ]) .then(response => {
                let role = response.employeeRole;
                findEmployees().then(([employees])=>{
                    function getManagers(employees) {
                        if (employees.manager_id===null){
                            return employees
                        }
                    }
                     const managers = employees.filter(getManagers).map(manager =>({
                         name : `${manager.first_name}  ${manager.last_name}`
                     }))
                     inquirer.prompt({
                         type: 'list',
                         name: 'managerName',
                         message: 'choose a manager',
                         choices: [...managers,"no manager"]
                     }) .then(response =>{
                         const roleID = dbRoles.filter(role =>role.name === role)[0]
                         const managerId = managers.filter(manager => manager.name === response.managerName)[0]
                         if (response.managerName==="no manager"){
                             db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",[firstName,lastName,roleID.id,null],(err,data)=>{
                                if (err){
                                    throw err
                                } else {
                                    console.log ("manager added")
                                    allfunctions()
                                }
                             })
                        // } else 
                            }
                     })
                }) 
            })
        })
    })
}
const findRoles =()=>db.promise().query("SELECT * FROM role")
allfunctions()

const findEmployees =()=>db.promise().query("SELECT * FROM employee")
