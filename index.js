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
    inquirer
        .prompt([
            {
                message: 'What is the employees first name?',
                name: 'first_name'
            },
            {
                message: 'What is the employees last name?',
                name: 'last_name'
            },
        ]).then(res => {
            let firstName = res.first_name
            let lastName = res.last_name

            db.findAllRoles()
            .then(([rows]) => {
                let roles = rows
                const roleList = roles.map(({id, title}) => ({
                    name: title,
                    value:id
                }))
                
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'What is the employees role?',
                            name: 'roleId',
                            choices: [roleList]
                        }
                    ]).then(res => {
                        let roleId = res.roleId
                        
                        db.findAllEmployees()
                        .then(([rows]) => {
                            let employees = rows
                            const managerList = employees.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }))

                            managerList.unshift({name:'none', value: null})

                            inquirer
                                .prompt([
                                    {
                                        type: 'list',
                                        message: 'Who is the employees manager?',
                                        name: 'managerId',
                                        choices: [managerList]
                                    }
                                ]).then(res => {
                                    let employee = {
                                        manager_id: res.manager_id,
                                        role_id: res.roleId,
                                        first_name: firstName,
                                        last_name: lastName
                                    }
                                    db.createEmployee(employee)
                                }).then(() => main())
                        })
                    })
            })
        })
}

function updateEmployeeRole() {
    db.findAllEmployees()
    .then(([rows]) => {
        let employees = rows
        const employeeList = employee.map(({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))

        inquirer    
            .prompt([
                {
                    type: 'list',
                    message: 'Which employees role do you want to update?',
                    name: 'employeeId',
                    choices: [employeeList]
                }
            ]).then(res => {
                let employeeId = res.employeeId
                db.findAllRoles()
                .then(([rows]) => {
                    let roles = rows
                    const roleList = roles.map(({id, title}) => ({
                        name: title,
                        value: id
                    }))

                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                message: 'what role do you want to give to your employee?',
                                name: 'roleId',
                                choices: [roleList]
                            }
                        ]).then(res => db.updateEmployeeRole(employeeId, res.roleId)).then(() => main())
                })
            })
    })

}

function quit() {
    process.exit()
}

main()