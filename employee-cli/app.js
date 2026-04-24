const fs = require('fs');
const readline = require('readline');

const FILE = 'employees.json';

// Load data
let employees = [];
if (fs.existsSync(FILE)) {
    employees = JSON.parse(fs.readFileSync(FILE));
}

// Save data
function saveData() {
    fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log(`
Employee Management System
1. Add Employee
2. List Employees
3. Update Employee
4. Delete Employee
5. Exit
`);

    rl.question("Select an option: ", choice => {
        switch (choice) {
            case '1': addEmployee(); break;
            case '2': listEmployees(); break;
            case '3': updateEmployee(); break;
            case '4': deleteEmployee(); break;
            case '5': rl.close(); break;
            default: menu();
        }
    });
}

function addEmployee() {
    rl.question("Name: ", name => {
        rl.question("Position: ", position => {
            rl.question("Salary: ", salary => {
                const emp = {
                    id: Date.now(),
                    name,
                    position,
                    salary: Number(salary)
                };
                employees.push(emp);
                saveData();
                console.log("Employee added!");
                menu();
            });
        });
    });
}

function listEmployees() {
    console.log("\nEmployee List:");
    employees.forEach(emp => {
        console.log(emp);
    });
    menu();
}

function updateEmployee() {
    rl.question("Enter ID: ", id => {
        const emp = employees.find(e => e.id == id);
        if (!emp) {
            console.log("Not found");
            return menu();
        }

        rl.question("New Name: ", name => {
            emp.name = name || emp.name;
            saveData();
            console.log("Updated!");
            menu();
        });
    });
}

function deleteEmployee() {
    rl.question("Enter ID: ", id => {
        employees = employees.filter(e => e.id != id);
        saveData();
        console.log("Deleted!");
        menu();
    });
}

menu();