$(document).ready(function () {
});


async function registerUser() {
    alert("Sexooo");
    let data = {};
    data.name = document.getElementById("exampleInputName").value;
    data.email = document.getElementById("exampleInputEmail").value;
    data.phone = document.getElementById("exampleInputPhoneNumber").value;
    data.password = document.getElementById("exampleInputPassword1").value;
    console.log(data);


    const request = await fetch('api/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //La función agarra un objeto de js y lo transforma a JSON
    });
}

