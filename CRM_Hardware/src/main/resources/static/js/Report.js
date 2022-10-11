window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

$(document).ready(function () {
    reportSale();
    reportSale2();
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
   
    let valores=modificarArry(sales);
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


    let miCanvas=document.getElementById("MiGrafica").getContext("2d");

    let chart=new Chart(miCanvas,{
    type:"bar",
    data:{
        labels:product,
        datasets:[
            {
                label:"Producto mas vendido",
                backgroundColor:colores,
                data:productValue
                
            }
        ]

        }
    })
    
    
}


function modificarArry(array){
    let arrayNuevo=[]
    let arrayNuevo2=[]

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


async function reportSale2() {
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
    

        const ctx = document.getElementById('MiGrafica2').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: product,
                datasets: [{
                    label: '# of Votes',
                    data: productValue,
                    backgroundColor:colores,
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        });
}



async function reportSale3() {
    
}