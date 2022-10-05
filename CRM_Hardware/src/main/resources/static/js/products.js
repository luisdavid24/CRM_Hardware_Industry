$(document).ready(function () {
    loadProducts();
});

let productToModify;

async function loadProducts() {

    const request = await fetch('api/products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
        //body: JSON.stringify({a: 1, b: 'Textual content'})
    });
    const productsHTML = await request.json();
    console.log(productsHTML);
  
    let listHTML = '';
    
    for(let it_product of productsHTML){
        btnDelete = "<button onclick=deleteProduct(\'"+it_product.productCode+"\')>\n\
                    <i class='bi bi-trash'></i>\n\
                    </button>";
        btnEdit = "<button onclick=loadData(\'"+it_product.productCode+"\') data-bs-toggle='modal' data-bs-target='#updateModal'>\n\
                   <i class='bi bi-pencil'></i>\n\
                   </button>";
        
        
        let productHTML = "<tr>\n\
                        <td>"+ it_product.productCode +"</td>\n\
                        <td>"+ it_product.name +"</td>\n\
                        <td>"+ it_product.price +"</td>\n\
                        <td>"+ it_product.units +"</td>\n\
                        <td>"+ it_product.supplier +"</td>\n\
                        <td>"+ btnDelete +"</td>\n\
                        <td>"+ btnEdit +"</td>\n\
                        </tr>";
        listHTML += productHTML;     
    }
    
    document.querySelector('#dataTable tbody').outerHTML = listHTML;
    
}

async function deleteProduct(productCode){
    
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
            setTimeout(function(){
                location.reload();
            }, 2000);
        }
      })

}