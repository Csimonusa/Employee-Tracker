USE employees

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Marketing'),
    ('Finance'),
    ('Legal'),
    ('Engineering');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Marketing Lead', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Legal Team Lead', 250000, 4)
    ('Lawyer', 190000, 4),
    ('Lead Developer', 200000, 5),
    ('Junior Developer', 90000, 5);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Natasha', 'Romanoff', 1, NULL),
    ('Clinton', 'Barton', 2, NULL),
    ('Steven', 'Rogers', 3, NULL),
    ('Jennifer', 'Walters', 4, NULL),
    ('Matthew', 'Murdock', 4, 5),
    ('Anthony', 'Stark', 5, NULL),
    ('Peter', 'Parker', 5, 1);