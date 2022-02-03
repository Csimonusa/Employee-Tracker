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
                    }
                ]
            }
        ])
}