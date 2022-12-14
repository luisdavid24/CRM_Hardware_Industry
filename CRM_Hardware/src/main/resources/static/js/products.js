/* A jQuery function that is executed when the document is ready. */
$(document).ready(function () {
    loadProducts();
    numbOfProducts();
    popularProduct();
});

let productToModify;

/**
 * It loads the products from the database and displays them in the HTML page.
 */
async function loadProducts() {

    const request = await fetch('api/products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });
    const productsHTML = await request.json();

    let listHTML = '';

    for (let it_product of productsHTML) {
        btnDelete = "<button class='btn btn-danger' onclick=deleteProduct(\'" + it_product.productCode + "\')>\n\
                    Delete\n\
                    </button>";
        btnEdit = "<button class='btn btn-primary' onclick=loadData(\'" + it_product.productCode + "\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
                   Update\n\
                   </button>";


        let productHTML = "<div class='item'>\n\
                            <img src="+it_product.imgURL+"> \n\
                            <h5>"+it_product.name+"</h2>\n\
                            <h6>"+it_product.productCode+"</h4>\n\
                            <p><b>Units:</b>"+ it_product.units +"</p>\n\
                            <p><b>Supplier:</b>" +it_product.supplier+ "</p>\n\
                            <p><b>Price per unit: $</b>"+ it_product.price +"</p>\n\
                            "+btnDelete+"\n\
                            "+btnEdit+"\n\
                        </div>"
        listHTML += productHTML;
    }

    document.querySelector('.gallery').innerHTML = listHTML;
}

/**
 * It's a function that deletes a product from the database.
 * @param productCode - the product code of the product to be deleted
 */
async function deleteProduct(productCode) {

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
            const request = await fetch('api/product/' + productCode, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                }
            });
            Swal.fire(
                'Deleted!',
                'The product has been deleted.',
                'success'
            )
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    })
}

/**
 * It gets the number of products from the database and displays it on the page.
 */
async function numbOfProducts() {
    const request = await fetch('api/numbOfProducts/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    let response = await request.json();
    let result = 0;

    for (const iterator of response) {
        result += parseInt(iterator);
    }

    document.querySelector("#numbOfProducts").innerHTML = result;
}

/**
 * It fetches a list of products from the database and displays them on the page.
 */
async function popularProduct() {
    const request = await fetch('api/popularProduct/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    let response = await request.text();

    document.querySelector("#popularProduct").innerHTML = response;
}

/**
 * It takes a product code as a parameter, makes a GET request to the server, and then populates the
 * form with the data from the server.
 * @param productCode - the product code of the product to be modified
 */
async function loadData(productCode) {
    productToModify = productCode;

    const request = await fetch('api/product/' + productCode, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    const productHTML = await request.json();
 

    document.getElementById("inputPrice").value = productHTML.price;
    document.getElementById("inputUnits").value = productHTML.units;
    document.getElementById("inputSupplier").value = productHTML.supplier;
    document.getElementById('productNameSpan').outerHTML = productHTML.name;
    document.getElementById('inputURL').value = productHTML.imgURL;
}

/**
 * It takes the data from the form and sends it to the server.
 * </code>
 */
async function modifyProduct() {
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

    data.price = document.getElementById("inputPrice").value;
    data.units = document.getElementById("inputUnits").value;
    data.supplier = document.getElementById("inputSupplier").value;
    data.imgURL = document.getElementById("inputURL").value;


    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const request = await fetch('/api/product/' + productToModify, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify({
                    price: data.price,
                    units: data.units,
                    supplier: data.supplier,
                    imgURL: data.imgURL
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
 * It takes the values from the inputs and sends them to the server.
 */
async function insertProduct() {

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

    data.productCode = document.getElementById("input_product_code").value;
    data.name = document.getElementById("input_name").value;
    data.price = document.getElementById("input_price").value;
    data.units = document.getElementById("input_units").value;
    data.supplier = document.getElementById("input_supplier").value;
    data.imgURL = document.getElementById("input_img").value;

    const request = await fetch('api/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(data) //La funci??n agarra un objeto de js y lo transforma a JSON
    });

    Toast.fire({
        icon: 'success',
        title: 'Product Inserted successfully'
    })
    setTimeout(function () {
        location.reload();
    }, 3000);

}