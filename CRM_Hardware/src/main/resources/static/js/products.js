$(document).ready(function () {
    loadProducts();
});

let productToModify;



window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

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
    console.log(productsHTML);

    let listHTML = '';

    for (let it_product of productsHTML) {
        btnDelete = "<button onclick=deleteProduct(\'" + it_product.productCode + "\')>\n\
                    <i class='bi bi-trash'></i>\n\
                    </button>";
        btnEdit = "<button onclick=loadData(\'" + it_product.productCode + "\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
                   <i class='bi bi-pencil'></i>\n\
                   </button>";


        let productHTML = "<tr>\n\
                        <td>"+ it_product.productCode + "</td>\n\
                        <td>"+ it_product.name + "</td>\n\
                        <td>"+ it_product.price + "</td>\n\
                        <td>"+ it_product.units + "</td>\n\
                        <td>"+ it_product.supplier + "</td>\n\
                        <td>"+ btnDelete + "</td>\n\
                        <td>"+ btnEdit + "</td>\n\
                        </tr>";
        listHTML += productHTML;
    }

    document.querySelector('#dataTable tbody').outerHTML = listHTML;

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
    console.log(productHTML.name);

    // document.modalForm.inputPrice.value = productHTML.price;
    // document.modalForm.inputUnits.value = productHTML.units;
    // document.modalForm.inputSupplier.value = productHTML.supplier;
    document.getElementById("inputPrice").value = productHTML.price;
    document.getElementById("inputUnits").value = productHTML.units;
    document.getElementById("inputSupplier").value = productHTML.supplier;
    document.getElementById('productNameSpan').outerHTML = productHTML.name;
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
                    supplier: data.supplier
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