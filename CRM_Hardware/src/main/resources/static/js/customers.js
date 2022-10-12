/* This is a jQuery function that waits for the DOM to be ready before executing the code inside the
function. */
$(document).ready(function () {
    loadCustomers();
});

let customerToModify;

/**
 * It fetches a list of customers from the server, and then displays them in a table.
 */
async function loadCustomers() {

    const request = await fetch('api/customer', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });
    const customersHTML = await request.json();
    console.log(customersHTML);

    let listHTML = '';

    document.querySelector('#sanNumberUser1').outerHTML = customersHTML.length;
    document.querySelector('#sanNumberUser2').outerHTML = customersHTML.length;

    for (let it_customer of customersHTML) {
        btnDelete = "<button class='btn-icons' onclick=deleteCustomer(\'" + it_customer.id + "\')>\n\
                    <i class='bi bi-trash'></i>\n\
                    </button>";
        btnEdit = "<button class='btn-icons' onclick=loadDataCustomer(\'" + it_customer.id + "\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
                    <i class='bi bi-pencil'></i>\n\
                    </button>";


        let productHTML = "<tr>\n\
                        <td>"+ it_customer.id + "</td>\n\
                        <td>"+ it_customer.name + "</td>\n\
                        <td>"+ it_customer.email + "</td>\n\
                        <td>"+ it_customer.phone + "</td>\n\
                        <td>"+ btnDelete + "</td>\n\
                        <td>"+ btnEdit + "</td>\n\
                        </tr>";
        listHTML += productHTML;
    }

    document.querySelector('#tableCustomers tbody').outerHTML = listHTML;

}

/**
 * It takes an id, makes a GET request to the server, and then populates the form with the data from
 * the server.
 * @param id - the id of the customer
 */
async function loadDataCustomer(id) {
    customerToModify = id;

    const request = await fetch('api/customer/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    const productHTML = await request.json();

    document.getElementById("inputEmail").value = productHTML.email;
    document.getElementById("inputPhone").value = productHTML.phone;
    document.getElementById('customerId').outerHTML = "Id:"+productHTML.id;
    document.getElementById("inputName").value = productHTML.name;
}

/**
 * If the user confirms the deletion, then the customer is deleted and the page is reloaded.
 * @param id - the id of the customer
 */
async function deleteCustomer(id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#43546F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const request = await fetch('api/customer/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                }
            });
            Swal.fire(
                'Deleted!',
                'The customer has been deleted.',
                'success'
            )
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    })
}

/**
 * It takes the data from the form and sends it to the server.
 */
async function modifyCustomer() {
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

    let data = {};

    data.name = document.getElementById("inputName").value;
    data.email = document.getElementById("inputEmail").value;
    data.phone = document.getElementById("inputPhone").value;
    console.log(data);


    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const request = await fetch('/api/customer/' + customerToModify, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone
                })
            });

            Toast.fire({
                icon: 'success',
                title: 'Saved successfully'
            })
            setTimeout(function () {
                location.reload();
            }, 3000);
        } else if (result.isDenied) {
            Toast.fire({
                icon: 'warning',
                title: 'Not Saved'
            })
            setTimeout(function () {
                location.reload();
            }, 3000);
        }
    })
}

/**
 * It takes the data from the form and sends it to the server.
 */
async function insertCustomer() {

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

    let data = {};

    data.name = document.getElementById("input_name").value;
    data.email = document.getElementById("input_email").value;
    data.phone = document.getElementById("input_phone").value;

    const request = await fetch('api/customer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(data) //La función agarra un objeto de js y lo transforma a JSON
    });

    Toast.fire({
        icon: 'success',
        title: 'Customer Inserted successfully'
    })
    setTimeout(function () {
        location.reload();
    }, 3000);

}