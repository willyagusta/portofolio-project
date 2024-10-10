--Creating Tables
 CREATE TABLE employees
(employee_id integer,
full_name varchar PRIMARY KEY,
age integer,
address varchar);

CREATE TABLE
 CREATE TABLE departments
(employee_name varchar PRIMARY KEY,
department_name varchar,
role varchar);

CREATE TABLE
 CREATE TABLE salaries 
(role varchar PRIMARY KEY,
salary integer,
 bonus integer);

--Inserting Data
 INSERT INTO employees (employee_id, full_name, age, address)
 VALUES
(14256, 'Jane Doe', 28, 'Wallstreet New York'),
(14563, 'John', 35, 'Baker Hill'),
(85642, 'Dave', 42, 'Hills Forth'),
(85640, 'Jim', 38, 'A Street'),
(65212, 'Bella', 32, 'B Street');

 INSERT INTO departments (employee_name, department_name, role)
 VALUES
('Jane', 'Finance', 'Staff'),
('John', 'Finance', 'Staff'),
('Dave', 'Marketing', 'Staff'),
('Jim', 'Marketing', 'Staff'),
('Bella', 'Operational', 'Staff');

 INSERT INTO salaries (role, salary, bonus)
 VALUES
('Staff', 2000, 250)
('Manager', 6000, 1000);


--Basic SQL Queries
--Select all employees
 SELECT * FROM employees;

--Select all employees based on department id
 SELECT employee_id FROM employees;

--Select all employees based on department id
 SELECT * FROM salaries
WHERE salary > 3000;

--Deleting an employee record based on  employee ID
 DELETE FROM employees
WHERE employee_id = 85640;

--Intermedia SQL Queries
--Retrieve employee details along with their department information.
 SELECT employee_id, full_name, age, department_name
FROM employees
RIGHT JOIN departments ON employees.full_name = departments.employee_name;


--Calculate the total salary expenditure for each department.
SELECT SUM(salary) FROM employees
RIGHT JOIN departments ON employees.full_name = departments.employee_name
RIGHT JOIN salaries ON departments.role = salaries.role;



--Find the average salary of employees in the company.
SELECT AVG(salary) FROM employees
RIGHT JOIN departments ON employees.full_name = departments.employee_name
RIGHT JOIN salaries ON departments.role = salaries.role;

--Joining 3 tables
--SELECT full_name, age, salaries.role, department_name, salary FROM employees
--RIGHT JOIN departments ON employees.full_name = departments.employee_name
--RIGHT JOIN salaries ON departments.role = salaries.role;

--Migration Script & Adding Hired 
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name='employees' AND column_name='hire_date'
    ) THEN
        -- Add the new column 'Hire_Date' to the 'employees' table
        ALTER TABLE employees
        ADD COLUMN hire_date DATE;
    END IF;
END $$;
