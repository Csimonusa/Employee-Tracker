const db = require('./db')
const inquirer = require('inquirer')
const consoleTable = require('console.table')

main = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What do you want to do?',
                name: 'choice',
                choices: [
                    {
                        name: 'View all departments',
                        value: 'view_departments'
                    },
                    {
                        name: 'View all roles',
                        value: 'view_roles'
                    },
                    {
                        name: 'View all employees',
                        value: 'view_employees'
                    },
                    {
                        name: 'Add department',
                        value: 'add_department'
                    },
                    {
                        name: 'Add role',
                        value: 'add_role'
                    },
                    {
                        name: 'Add employee',
                        value: 'add_employee'
                    },
                    {
                        name: 'Update an employee role',
                        value: 'update_employee_role'
                    },
                    {
                        name: 'Quit',
                        value: 'quit'
                    }
                ]
            }
        ]).then(res => {
            let choice = res.choice

            switch(choice) {
                case 'view_departments':
                    viewDepartments()
                    break
                case 'view_roles':
                    viewRoles()
                    break
                case 'view_employees':
                    viewEmployees()
                    break
                case 'add_department':
                    addDepartment()
                    break
                case 'add_role':
                    addRole()
                    break
                case 'add_employee':
                    addEmployee()
                    break
                case 'update_employee_role':
                    updateEmployeeRole()
                    break
                default:
                    quit()
            }
        })
}

function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows
        console.log('\n')
        console.table(departments)
    }).then(() => main())
}