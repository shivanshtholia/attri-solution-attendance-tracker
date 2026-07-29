
const token = localStorage.getItem("token");

const user = JSON.parse(localStorage.getItem("user"));

if(!token){

    window.location = "index.html";

}
async function loadDashboard(){

    try{

        const response = await fetch("http://localhost:5000/api/dashboard",{

            headers:{

                Authorization:`Bearer ${token}`

            }

        });

        const data = await response.json();

        document.getElementById("emp").textContent =
        data.totalEmployees;

        document.getElementById("present").textContent =
        data.present;

        document.getElementById("absent").textContent =
        data.absent;

        let percentage = 0;

        if(data.totalEmployees>0){

            percentage=((data.present/data.totalEmployees)*100).toFixed(1);

        }

        document.getElementById("percentage").textContent =
        percentage+"%";

        document.getElementById("today").textContent =
        "Date : "+new Date().toLocaleDateString();

        document.getElementById("welcome").textContent =
        "Welcome "+user.name+" 👋";

    }

    catch(error){

        console.log(error);

        alert("Unable to Load Dashboard");

    }

}

loadDashboard();
function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location="index.html";

}