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

async function loadSales() {
    
    const request = await fetch('api/sale', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const sales = await request.json();
    
    let valores=modificarArry(sales);
    let product=[];
    let productValue=[];
    
    for(let i=0;i<valores.length;i+=2){
        product.push(valores[i]);
    }
    for(let i=1;i<valores.length;i+=2){
        productValue.push(valores[i]);
    }
    
    let miCanvas=document.getElementById("MiGrafica").getContext("2d");

    let chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        
        labels:product,
        datasets:[
            {
                label:"Mi grafica",
                backgroundColor:"rgb(0,0,0)",
                data:productValue
            }
        ]

        }
    })
    
    
}

function modificarArry(array){
    let arrayNuevo=[]
    for (let elemento of array) {
        let condicion=arrayNuevo.indexOf(elemento.product_code);
        if(condicion===-1){
            arrayNuevo.push(elemento.product_code);
            arrayNuevo.push(elemento.units);
            
        }else{
            let posicion=arrayNuevo.findIndex((index)=>index==elemento.product_code);
            let valor=arrayNuevo[posicion+1];
            valor+=elemento.units;
            arrayNuevo[posicion+1]=valor;
            
        }

    }
    
    return arrayNuevo;
}



