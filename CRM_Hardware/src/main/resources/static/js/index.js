$(document).ready(function () {
});

async function startSesion() {
    let data = {};

    data.email = document.getElementById("exampleInputEmail1").value;
    data.password = document.getElementById("exampleInputPassword1").value;

    console.log(data);

    const request = await fetch('api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }) //La función agarra un objeto de js y lo transforma a JSON
    });
    
    const response = await request.text();
    

    if (response != 'FAIL') {
        localStorage.token = response;
        getUserName(data.email);
        // window.location.href = 'home.html';
    }else{
        alert("Credenciales invalidas")
    }
}

async function getUserName(email) {
    fetch('api/user/' + email)
        .then(response => response.json())
        .then(json => localStorage.name = json.name);
}



