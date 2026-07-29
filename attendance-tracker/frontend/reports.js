const API_URL = "http://localhost:5000/api";

const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if (!token) {

    window.location.href = "index.html";

}

if (user.role !== "admin") {

    window.location.href = "employee-dashboard.html";

}

let reports = [];

async function loadReports() {

    try {

        const response = await fetch(`${API_URL}/attendance`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        reports = await response.json();

        renderTable();

    }

    catch (error) {

        console.log(error);

        alert("Unable to load reports.");

    }

}

function renderTable() {

    const table = document.getElementById("reportTable");

    table.innerHTML = `

    <tr>

        <th>Name</th>

        <th>Department</th>

        <th>Status</th>

        <th>Check In</th>

        <th>Check Out</th>

        <th>Date</th>

    </tr>

    `;

    reports.forEach(report => {

        table.innerHTML += `

        <tr>

            <td>${report.employee.user.name}</td>

            <td>${report.employee.department}</td>

            <td>${report.status}</td>

            <td>${report.checkIn || "-"}</td>

            <td>${report.checkOut || "-"}</td>

            <td>${new Date(report.date).toLocaleDateString()}</td>

        </tr>

        `;

    });

}

loadReports();
function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "index.html";

}

function downloadCSV() {

    let csv = "Name,Department,Status,Check In,Check Out,Date\n";

    reports.forEach(report => {

        csv += `${report.employee.user.name},`;

        csv += `${report.employee.department},`;

        csv += `${report.status},`;

        csv += `${report.checkIn || "-"},`;

        csv += `${report.checkOut || "-"},`;

        csv += `${new Date(report.date).toLocaleDateString()}\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Attendance_Report.csv";

    a.click();

}