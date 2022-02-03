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

function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows
        console.log('\n')
        console.table(roles)
    }).then(() => main())
}

function viewEmployees() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        console.log('\n')
        console.table(employees)
    }).then(() => main())
}

function addDepartment() {
    inquirer
        .prompt([
            {
                message: 'Name of department?',
                name: 'name'
            }
        ]).then(res => {
            let name = res
            db.createDepartment(name)
            .then(() => main())
        })
}

function addRole() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows
        const departmentsList = departments.map(({id, name}) => ({
            name: name,
            value: id
        }))

        inquirer
            .prompt([
                {
                    message: 'name of role?',
                    name: 'title'
                },
                {
                    message: 'Salary for this role?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'What department do you want to add this role to?',
                    name: 'department_id',
                    choices: [departmentsList]
                }
            ]).then(role => {
                db.createRole(role).then(() => main())
            })
    })
}

function addEmployee() {

}

function updateEmployeeRole() {

}