window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

$(document).ready(function () {
    reportSale();
    reportProduct();
});
let colores=["#3371FF","#E6DF92","#BFF5D7","#E6CFF1",'#B833FF',"#CFD7F1","#FF33E0","#33FFF9","#9F33FF","#F1F99A","#BFF5D7"];
let colores2=['#B833FF',"#FF33E0","#E6DF92","#BFF5D7","#E6CFF1","#3371FF","#CFD7F1","#33FFF9","#9F33FF","#F1F99A","#BFF5D7"];

async function reportSale() {
    
    const request = await fetch('api/sale', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const sales = await request.json();
   
    let valores=modificarArrySale(sales);
    let product=[];
    let productValue=[];
    
    for(let i=0;i<valores.length;i+=2){
        product.push(valores[i]);
    }
    for(let i=1;i<valores.length;i+=2){
        productValue.push(valores[i]);
    }
    let masVendido="The best selling product is: "+product[0];
    let menosVendido="The least sold product is: "+product[product.length-1];
    
    document.getElementById('masVendidoP').innerHTML=masVendido;
    document.getElementById('menosVendidoP').innerHTML=menosVendido;

    
    generarGraficoBarra(product,"Producto mas vendido",colores,productValue,"MiGrafica");
    generarGraficoTorta(product,productValue,colores,'MiGrafica2');
    
}
function generarGraficoBarra(product,text,colores,value,id){
    let miCanvas=document.getElementById(id).getContext("2d");

    let chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:product,
        datasets:[
            {
                label:text,
                backgroundColor:colores,
                data:value
                
            }
        ]

        }
    })
}

function modificarArrySale(array){
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
    
    burburja(arrayNuevo);
    
    return arrayNuevo;
}
function burburja(array){
    
    let n=array.length-2;
    let intercambiar;

    do{
        intercambiar=false;
       for(let i=1;i<n;i+=2){
            if(array[i]<array[i+2]){
                let temp=array[i];
                let tempoText=array[i-1];
                array[i-1]=array[i+1];
                array[i]=array[i+2];
                array[i+2]=temp;
                array[i+1]=tempoText;
                intercambiar=true;
            }
       } 
        --n;
    }while(intercambiar);
    
}





 function generarGraficoTorta(elemento,value,color,id) {
    const ctx = document.getElementById(id).getContext('2d');
    const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: elemento,
                datasets: [{
                    data: value,
                    backgroundColor:color,
                    borderColor: color,
                    borderWidth: 1
                }]
            },
            options: {}
        });
}


async function reportProduct() {

    const request = await fetch('api/products', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });
    const productsHTML = await request.json()
    let valores=modificarProduct(productsHTML);
    console.log(valores);
    let product=[];
    let productValue=[];
    
    for(let i=0;i<valores.length;i+=2){
        product.push(valores[i]);
    }
    for(let i=1;i<valores.length;i+=2){
        productValue.push(valores[i]);
    }
    let masStock="More inventory of: "+product[0];
    let menosStcok="Less inventory of: "+product[product.length-1];
    
    document.getElementById('masStockP').innerHTML=masStock;
    document.getElementById('menosStockP').innerHTML=menosStcok;


    generarGraficoBarra(product,"The product that has the most inventory",colores2,productValue,"MiGrafica3");
    generarGraficoTorta(product,productValue,colores2,'MiGrafica4');
}


function modificarProduct(array){
    let arrayNuevo=[]
    for (let elemento of array) {
        let condicion=arrayNuevo.indexOf(elemento.product_code);
        if(condicion===-1){
            arrayNuevo.push(elemento.name);
            arrayNuevo.push(elemento.units);
            
        }else{
            let posicion=arrayNuevo.findIndex((index)=>index==elemento.product_code);
            let valor=arrayNuevo[posicion+1];
            valor+=elemento.units;
            arrayNuevo[posicion+1]=valor;
            
        }

    }
    
    burburja(arrayNuevo);
    
    return arrayNuevo;
}