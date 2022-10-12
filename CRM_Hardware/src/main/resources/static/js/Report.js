/* A function that is executed when the page is loaded, it is used to hide the loader. */
window.addEventListener("load", () =>{
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitioned", () =>{
        document.body.removeChild(loader);
    })
})

/* A jQuery function that is executed when the page is loaded. */
$(document).ready(function () {
    reportSale();
    reportProduct();
});
let colores=["#3371FF","#E6DF92","#BFF5D7","#E6CFF1",'#B833FF',"#CFD7F1","#FF33E0","#33FFF9","#9F33FF","#F1F99A","#BFF5D7"];
let colores2=['#B833FF',"#FF33E0","#E6DF92","#BFF5D7","#E6CFF1","#3371FF","#CFD7F1","#33FFF9","#9F33FF","#F1F99A","#BFF5D7"];

/**
 * It fetches data from an API, then it generates two charts.
 */
async function reportSale() {
    
    const request = await fetch('api/sale', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        }
    });

    const sales = await request.json();
   
    let valores=updateArrySale(sales);
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

    
    generateBarChart(product,"Producto mas vendido",colores,productValue,"MiGrafica");
    generateBarPie(product,productValue,colores,'MiGrafica2');
    
}
/**
 * It takes in an array of product names, an array of colors, an array of values, and a string for the
 * title of the chart. It then creates a bar chart with the given data.
 * @param product - array of strings
 * @param text - The text that will be displayed on the chart
 * @param colores - an array of colors
 * @param value - [1,2,3,4,5,6,7,8,9,10]
 * @param id - the id of the canvas element
 */
function generateBarChart(product,text,colores,value,id){
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

/**
 * It takes an array of objects, and returns an array of strings, where each string is the product code
 * of an object in the original array, and the next string is the sum of the units of all objects in
 * the original array with that product code.
 * @param array - the array of objects that you want to update
 * @returns An array of product codes and units sold.
 */
function updateArrySale(array){
    let arrayNew=[]
    for (let elemento of array) {
        let condicion=arrayNew.indexOf(elemento.product_code);
        if(condicion===-1){
            arrayNew.push(elemento.product_code);
            arrayNew.push(elemento.units);
            
        }else{
            let posicion=arrayNew.findIndex((index)=>index==elemento.product_code);
            let valor=arrayNew[posicion+1];
            valor+=elemento.units;
            arrayNew[posicion+1]=valor;
            
        }

    }
    
    burburja(arrayNew);
    
    return arrayNew;
}
/**
 * It takes an array of numbers and text, and sorts the numbers in ascending order, while keeping the
 * text in the same position as the numbers.
 * @param array - The array to be sorted.
 */
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


/**
 * It takes an array of labels, an array of values, an array of colors, and an id, and it generates a
 * pie chart with the given labels, values, and colors.
 * @param elemento - array of strings
 * @param value - [1,2,3,4,5]
 * @param color - an array of colors
 * @param id - the id of the canvas element
 */
 function generateBarPie(elemento,value,color,id) {
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


/**
 * It gets the products from the database, modifies the array, and then generates a bar chart and a pie
 * chart.
 */
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
    let valores=modifyArray(productsHTML);
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


    generateBarChart(product,"The product that has the most inventory",colores2,productValue,"MiGrafica3");
    generateBarPie(product,productValue,colores2,'MiGrafica4');
}


/**
 * It takes an array of objects, and returns an array of strings.
 * @param array - the array to be modified
 * @returns an array with the name of the product and the units of the product.
 */
function modifyArray(array){
    let arrayNew=[]
    for (let elemento of array) {
        let condicion=arrayNew.indexOf(elemento.product_code);
        if(condicion===-1){
            arrayNew.push(elemento.name);
            arrayNew.push(elemento.units);
            
        }else{
            let posicion=arrayNew.findIndex((index)=>index==elemento.product_code);
            let valor=arrayNew[posicion+1];
            valor+=elemento.units;
            arrayNew[posicion+1]=valor;
            
        }

    }
    
    burburja(arrayNew);
    
    return arrayNew;
}

/* A jQuery function that is executed when the page is loaded. It is used to print the page. */
$(document).ready(function(){
    $('#btnPdf').click(function(){
        $('#containerReportMaster').printThis();
    })
})