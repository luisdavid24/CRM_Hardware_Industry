/* Preventing the form from being submitted. */
$(document).ready(function () {
    $(document).on('submit', '#pruebaForm', function() {
        
        return false;
    });
});


/**
 * It checks if the email is from the company, if it is, it checks if the form is valid, if it is, it
 * sends the data to the server, if the server responds with a 200 status code, it shows a toast and
 * redirects to the login page.
 */
async function registerUser() {

    validation();


    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    let data = {};
    data.name = document.getElementById("inputRegisterName").value;
    data.email = document.getElementById("inputRegiterEmail").value;
    data.phone = document.getElementById("inputRegisterNumber").value;
    data.password = document.getElementById("inputRegisterPassword").value;
    console.log(data);

    console.log(data.email.includes('@elpoli.edu.co'));

    if (data.email.includes('@elpoli.edu.co')) {
        const form = document.querySelector('.needs-validation');
        if (form.classList.contains('was-validated')) {
            const request = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) //La función agarra un objeto de js y lo transforma a JSON
            });

            if(request.status === 200){
                Toast.fire({
                    icon: 'success',
                    title: 'User registered, please login'
                })

                setTimeout(function () {
                    window.location.href = 'index.html'
                }, 2000);
                
            }
        }    
    }else{
        Toast.fire({
            icon: 'warning',
            title: 'Only users with corporate mail can be registered'
        })
    }

      
    
}

/**
 * If the form is not valid, prevent the default action and stop the propagation of the event.
 * @param params - {
 */
function validation(params) {
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
