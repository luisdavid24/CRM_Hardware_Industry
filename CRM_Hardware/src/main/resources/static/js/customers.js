window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

$(document).ready(function () {
    loadCustomers();
});

let customerToModify;

async function loadCustomers() {

    const request = await fetch('api/customer', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const customersHTML = await request.json();
    console.log(customersHTML);

    let listHTML = '';

    document.querySelector('#sanNumberUser1').outerHTML = customersHTML.length;
    document.querySelector('#sanNumberUser2').outerHTML = customersHTML.length;
    alert(customersHTML.length);

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

async function loadDataCustomer(id) {
    customerToModify = id;

    const request = await fetch('api/customer/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const productHTML = await request.json();

    document.getElementById("inputEmail").value = productHTML.email;
    document.getElementById("inputPhone").value = productHTML.phone;
    document.getElementById('customerId').outerHTML = "Id:"+productHTML.id;
    document.getElementById("inputName").value = productHTML.name;
}

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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) //La función agarra un objeto de js y lo transforma a JSON
    });

    Toast.fire({
        icon: 'success',
        title: 'Product Inserted successfully'
    })
    setTimeout(function () {
        location.reload();
    }, 3000);

}