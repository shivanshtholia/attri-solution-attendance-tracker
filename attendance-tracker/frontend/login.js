async function login() {

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const msg = document.getElementById("msg");

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email,
                password

            })

        });

        const data = await response.json();

        if (response.ok) {

            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify(data.user));

            msg.style.color = "green";
            msg.innerHTML = "Login Successful";

            setTimeout(() => {

                if(data.user.role==="admin"){

                    window.location.href="dashboard.html";

                    }

                    else{

                        window.location.href="employee-dashboard.html";

                    }

            }, 800);

        }

        else {

            msg.style.color = "red";
            msg.innerHTML = data.message;

        }

    }

    catch (error) {

        msg.style.color = "red";
        msg.innerHTML = "Server Error";

    }

}