$(document).ready(function () {
    loadSales();
});


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
        let fecha=String(sale.date);
        fecha=fecha.slice(0,10);
        
        let botonEliminar = "<button class='btn-icons' onclick=deleteSale(" +sale.id+ ")>\n\<i class='bi bi-trash'></i>\n\</button>";
        botonEditar= "<button class='btn-icons' onclick=updateSale(" +sale.id + ") data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
        <i class='bi bi-pencil'></i>\n\
        </button>";
        let saleHtml='<tr><td> '+sale.id+' </td><td> '+fecha+' </td><td> '+sale.product_code+' </td><td> '+sale.units+' </td><td> '+sale.value+' </td><td>'+botonEliminar+'</td><td>'+botonEditar+'</td></th></tr>';
        
        listadoHtml += saleHtml;
    }
    document.querySelector('#tableSale tbody ').outerHTML = listadoHtml;
    
}
let idUpdate=null;
let dateUpdate=null;
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
            dateUpdate=sale.date;
        }
    }
    document.getElementById('input_product_code_update').value=saleUpdate.product_code;
    document.getElementById('input_units_update').value=saleUpdate.units;
    document.getElementById('input_value_update').value=saleUpdate.value;
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
    // datos.date = document.getElementById('txtDate');
    datos.product_code = document.getElementById('input_product_code_update').value;
    datos.units = document.getElementById('input_value_update').value;
    datos.value = document.getElementById('input_units_update').value;
    datos.date=dateUpdate;
    
    console.log(datos);

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
async function addSale() {
    let datos = {};
    datos.date = document.getElementById('input_date').value;
    datos.product_code = document.getElementById('input_product_code').value;
    datos.units = document.getElementById('input_units').value;
    datos.value = document.getElementById('input_value').value;
    
    // console.log(datos);
  
    const request = await fetch('api/sale', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    loadSales();
   
}
    

