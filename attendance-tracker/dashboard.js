
if(localStorage.getItem("login")!="true"){
    window.location="index.html";
}

function loadDashboard(){

    let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

    let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

    let present =
    attendance.filter(e=>e.status==="Present").length;

    let absent =
    attendance.filter(e=>e.status==="Absent").length;

    document.getElementById("emp").textContent =
    employees.length;

    document.getElementById("present").textContent =
    present;

    document.getElementById("absent").textContent =
    absent;

    let percentage = 0;

    if(employees.length>0){

        percentage=((present/employees.length)*100).toFixed(1);

    }

    document.getElementById("percentage").textContent =
    percentage+"%";

    let today=document.getElementById("today");

    if(today){

        today.textContent=
        "Date : "+new Date().toLocaleDateString();

    }

    let welcome=document.getElementById("welcome");

    if(welcome){

        welcome.textContent="Welcome Admin 👋";

    }

}

window.onload=function(){

loadDashboard();

}

function logout(){

    localStorage.removeItem("login");

    window.location="index.html";

}