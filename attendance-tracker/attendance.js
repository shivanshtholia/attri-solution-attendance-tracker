if(localStorage.getItem("login")!="true"){
window.location="index.html";
}

let employees=JSON.parse(localStorage.getItem("employees"))||[];

let attendance=JSON.parse(localStorage.getItem("attendance"))||[];

let table=document.getElementById("attendanceTable");

employees.forEach((emp,index)=>{

table.innerHTML+=`

<tr>

<td>${emp.name}</td>

<td>${emp.department}</td>

<td>

<select id="status${index}">

<option value="Present">Present</option>

<option value="Absent">Absent</option>

</select>

</td>

</tr>

`;

});

function saveAttendance(){

attendance=[];

employees.forEach((emp,index)=>{

attendance.push({

name:emp.name,

department:emp.department,

status:document.getElementById("status"+index).value

});

});

localStorage.setItem("attendance",JSON.stringify(attendance));

alert("Attendance Saved");
window.location.href="dashboard.html";
}

function logout(){

localStorage.removeItem("login");

window.location="index.html";

}