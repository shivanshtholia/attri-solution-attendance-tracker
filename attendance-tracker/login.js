function login(){

let user=document.getElementById("username").value;

let pass=document.getElementById("password").value;

if(user=="admin" && pass=="1234"){

localStorage.setItem("login","true");
localStorage.setItem("username",user);
window.location="dashboard.html";

}

else{

document.getElementById("msg").innerHTML="Invalid Username or Password";

}

}