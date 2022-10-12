$(document).ready(function () {
    $(document).on('submit', '#pruebaForm', function() {
        return false;
    });
});

async function startSesion() {
    validation();
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
        setTimeout(function () {
            window.location.href = 'home.html'
        }, 1000);
    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'warning',
            title: 'User or password incorrect'
        })
    }
}

async function getUserName(email) {
    fetch('api/user/' + email)
        .then(response => response.json())
        .then(json => localStorage.name = json.name);
}

function validation() {
    (() => {
        'use strict'
      
        const forms = document.querySelectorAll('.needs-validation')
      
        Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
      
            form.classList.add('was-validated')
            return true;
          }, false)
        })
    })()
}


