const API_URL = "http://localhost:5000/api";

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

        const response = await fetch(`${API_URL}/employees`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        employees = await response.json();

        renderTable();

    }

    catch (error) {

        console.log(error);

        alert("Unable to load employees.");

    }

}

function renderTable() {

    const table = document.getElementById("attendanceTable");

    table.innerHTML = `

    <tr>

        <th>Name</th>

        <th>Department</th>

        <th>Status</th>

        <th>Check In</th>

        <th>Check Out</th>

    </tr>

    `;

    employees.forEach((emp, index) => {

        table.innerHTML += `

        <tr>

            <td>${emp.user.name}</td>

            <td>${emp.department}</td>

            <td>

                <select id="status${index}">

                    <option value="Present">Present</option>

                    <option value="Absent">Absent</option>

                    <option value="Leave">Leave</option>

                </select>

            </td>

            <td>

                <input type="time" id="checkIn${index}">

            </td>

            <td>

                <input type="time" id="checkOut${index}">

            </td>

        </tr>

        `;

    });

}

loadEmployees();
// =======================
// Save Attendance
// =======================

async function saveAttendance() {

    try {

        let success = true;

        for (let i = 0; i < employees.length; i++) {

            const employee = employees[i];

            const status = document.getElementById(`status${i}`).value;

            const attendance = {

                employeeId: employee._id,

                status: status,

                checkIn: status === "Present"
                    ? document.getElementById(`checkIn${i}`).value
                    : "",

                checkOut: status === "Present"
                    ? document.getElementById(`checkOut${i}`).value
                    : ""

            };

            const response = await fetch(`${API_URL}/attendance`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify(attendance)

            });

            if (!response.ok) {

                success = false;

                console.log(await response.json());

            }

        }

        if (success) {

            alert("Attendance Saved Successfully");

            window.location.href = "dashboard.html";

        } else {

            alert("Some attendance records failed to save.");

        }

    }

    catch (error) {

        console.log(error);

        alert("Unable to save attendance.");

    }

}

// =======================
// Logout
// =======================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "index.html";

}