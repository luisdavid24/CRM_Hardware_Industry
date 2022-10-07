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

