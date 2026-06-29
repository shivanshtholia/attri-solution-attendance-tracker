// Check Login
if (localStorage.getItem("login") !== "true") {
    window.location = "index.html";
}

// Load Employees
let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Save Employees
function saveEmployees() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Render Employee Table
function renderTable(list = employees) {

    let table = document.getElementById("table");

    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Action</th>
        </tr>
    `;

    list.forEach((emp) => {

        // Original Index Find
        const originalIndex = employees.findIndex(
            e => e.name === emp.name && e.department === emp.department
        );

        table.innerHTML += `
            <tr>
                <td>${emp.name}</td>
                <td>${emp.department}</td>
                <td>
                    <button onclick="editEmployee(${originalIndex})">Edit</button>
                    <button onclick="deleteEmployee(${originalIndex})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add Employee
function addEmployee() {

    let name = document.getElementById("name").value.trim();
    let department = document.getElementById("department").value.trim();

    if (name === "" || department === "") {
        alert("Please fill all fields.");
        return;
    }

    // Prevent Duplicate
    let exists = employees.some(
        emp =>
            emp.name.toLowerCase() === name.toLowerCase() &&
            emp.department.toLowerCase() === department.toLowerCase()
    );

    if (exists) {
        alert("Employee already exists.");
        return;
    }

    employees.push({
        name,
        department
    });

    saveEmployees();
    renderTable();

    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
}

// Delete Employee
function deleteEmployee(index) {

    if (confirm("Are you sure you want to delete this employee?")) {

        employees.splice(index, 1);

        saveEmployees();

        renderTable();
    }
}

// Edit Employee
function editEmployee(index) {

    let newName = prompt("Employee Name", employees[index].name);

    if (newName === null) return;

    let newDept = prompt("Department", employees[index].department);

    if (newDept === null) return;

    newName = newName.trim();
    newDept = newDept.trim();

    if (newName === "" || newDept === "") {
        alert("Fields cannot be empty.");
        return;
    }

    employees[index].name = newName;
    employees[index].department = newDept;

    saveEmployees();
    renderTable();
}

// Search Employee
function searchEmployee() {

    let value = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value)
    );

    renderTable(filtered);
}

// Logout
function logout() {

    localStorage.removeItem("login");

    window.location = "index.html";
}

// Initial Load
renderTable();