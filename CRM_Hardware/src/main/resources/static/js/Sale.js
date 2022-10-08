window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

$(document).ready(function () {
    loadSales();
});

let customerToModify;

async function loadSales() {

    const request = await fetch('api/sale', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    const sales = await request.json();
    let listadoHtml = '';

    for (let sale of sales) {
        let botonEliminar = "<button class='btn-icons' onclick=deleteSale(" +sale.id+ ")>\n\<i class='bi bi-trash'></i>\n\</button>";
        botonEditar= "<button class='btn-icons' onclick=updateSale(" +sale.id + ") data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
        <i class='bi bi-pencil'></i>\n\
        </button>";
        let saleHtml='<tr><td> '+sale.id+' </td><td> '+sale.date+' </td><td> '+sale.product_code+' </td><td> '+sale.units+' </td><td> '+sale.value+' </td><td>'+botonEliminar+'</td><td>'+botonEditar+'</td></th></tr>';
    
      listadoHtml += saleHtml;
    }
    document.querySelector('#tableSale tbody ').outerHTML = listadoHtml;

}
let idUpdate=null;
async function updateSale(id) {
    const request = await fetch('api/sale', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    let saleUpdate = {};
    idUpdate=id;

    const sales = await request.json();
    for (let sale of sales) {
        if(sale.id==id){
            saleUpdate=sale;
        }
    }
    document.getElementById('txtProduct_code').value=saleUpdate.product_code;
    document.getElementById('units').value=saleUpdate.units;
    document.getElementById('value').value=saleUpdate.value;
}

async function deleteSale(id) {

    const request = await fetch('api/sale/'+id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    location.reload();
}
function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        
    };
    }
    
    async function modSale() {
    let datos = {};
    datos.id=idUpdate;
    datos.date = document.getElementById('txtDate').value;
    datos.product_code = document.getElementById('txtProduct_code').value;
    datos.units = document.getElementById('units').value;
    datos.value = document.getElementById('value').value;
    
    const request = await fetch('api/sale/' + idUpdate, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
            date: datos.date,
            product_code: datos.product_code,
            units: datos.units,
            value: datos.value
        }) 
    });
    loadSales();
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