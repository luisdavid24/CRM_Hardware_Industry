$(document).ready(function () {
    loadProducts();
});

let productToModify;



// window.addEventListener("load", () =>{
//     const loader = document.querySelector(".loader");
//     loader.classList.add("loader--hidden");

//     loader.addEventListener("transitioned", () =>{
//         document.body.removeChild(loader);
//     })
// })

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

    document.querySelector('.gallery').outerHTML = listHTML;

}

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
                    'Content-Type': 'application/json'
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