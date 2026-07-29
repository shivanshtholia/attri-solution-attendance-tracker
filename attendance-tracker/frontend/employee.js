const API_URL = "http://localhost:5000/api/employees";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token) {
    window.location.href = "index.html";
}

if (user.role !== "admin") {
    window.location.href = "employee-dashboard.html";
}

let employees = [];

async function loadEmployees() {

    try {

        const response = await fetch(API_URL, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        employees = data;

        renderTable(employees);

    }

    catch (error) {

        console.log(error);

        alert("Unable to load employees.");

    }

}

function renderTable(list = employees) {

    let table = document.getElementById("table");

    table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Designation</th>
        <th>Salary</th>
        <th>Phone</th>
        <th>Action</th>
    </tr>
    `;

    list.forEach((emp) => {

        table.innerHTML += `

        <tr>

            <td>${emp.user.name}</td>

            <td>${emp.user.email}</td>

            <td>${emp.department}</td>

            <td>${emp.designation}</td>

            <td>${emp.salary}</td>

            <td>${emp.phone}</td>

            <td>

                <button onclick="editEmployee('${emp._id}')">
                Edit
                </button>

                <button onclick="deleteEmployee('${emp._id}')">
                Delete
                </button>

            </td>

        </tr>

        `;

    });

}

loadEmployees();
// =======================
// Add Employee
// =======================

async function addEmployee() {

    const employee = {

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        password: document.getElementById("password").value.trim(),

        department: document.getElementById("department").value.trim(),

        designation: document.getElementById("designation").value.trim(),

        salary: document.getElementById("salary").value,

        phone: document.getElementById("phone").value.trim()

    };

    if (
        !employee.name ||
        !employee.email ||
        !employee.password ||
        !employee.department ||
        !employee.designation
    ) {

        alert("Please fill all required fields.");

        return;

    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify(employee)

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("department").value = "";
            document.getElementById("designation").value = "";
            document.getElementById("salary").value = "";
            document.getElementById("phone").value = "";

            loadEmployees();

        }

    }

    catch (error) {

        console.log(error);

        alert("Unable to add employee.");

    }

}

// =======================
// Edit Employee
// =======================

async function editEmployee(id) {

    const employee = employees.find(emp => emp._id === id);

    if (!employee) return;

    const department = prompt("Department", employee.department);

    if (department === null) return;

    const designation = prompt("Designation", employee.designation);

    if (designation === null) return;

    const salary = prompt("Salary", employee.salary);

    if (salary === null) return;

    const phone = prompt("Phone", employee.phone);

    if (phone === null) return;

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                department,

                designation,

                salary,

                phone

            })

        });

        const data = await response.json();

        alert("Employee Updated");

        loadEmployees();

    }

    catch (error) {

        console.log(error);

        alert("Unable to update employee.");

    }

}

// =======================
// Delete Employee
// =======================

async function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {

        return;

    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {

            method: "DELETE",

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        alert(data.message);

        loadEmployees();

    }

    catch (error) {

        console.log(error);

        alert("Unable to delete employee.");

    }

}

// =======================
// Search Employee
// =======================

function searchEmployee() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = employees.filter(emp =>

        emp.user.name.toLowerCase().includes(value) ||

        emp.user.email.toLowerCase().includes(value) ||

        emp.department.toLowerCase().includes(value) ||

        emp.designation.toLowerCase().includes(value)

    );

    renderTable(filtered);

}

// =======================
// Logout
// =======================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "index.html";

}