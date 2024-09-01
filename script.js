//! call the inputs 
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let taxes = document.getElementById('taxes');
    let ads = document.getElementById('ads');
    let discount = document.getElementById('discount');
    let total = document.getElementById('total');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let createBtn = document.getElementById('createBtn');


    let mood = 'create';
    let tmp ;

//! function get to totle 

function getTotle(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value
        total.innerHTML = result ;
        total.style.background ='hsla(120, 100%, 40%, 0.788)';
    }
    else{
        total.innerHTML = '';
        total.style.background ='red';
    }

}

//! function to creat product 

let dataProducts ;

if (localStorage.product != null){
    dataProducts = JSON.parse(localStorage.product);
}
else{
    dataProducts = [];  
}
                
createBtn.addEventListener('click' , function(){
    let newProducts = {

        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML, 
        count:count.value,
        category:category.value.toLowerCase(),
    }


    if(title.value != '' && price.value != '' 
        && category.value != '' && newProducts.count < 101 ){
        if (mood === 'create'){
            if(newProducts.count > 1){
                for(let i = 0 ; i < newProducts.count ; i++){
                    dataProducts.push(newProducts);  
                }
            }
            else{
                dataProducts.push(newProducts); 
            }
        
        }
        else{
            dataProducts[tmp] = newProducts ; 
            mood = 'create';
            createBtn.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();
    }

    localStorage.setItem('product' , JSON.stringify(dataProducts) )
    showData();
    
})

//! clear inputs

function clearData(){

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '' ;
    count.value = '';
    category.value = '';
}

//! read in table 
function showData(){

    getTotle();

    let table = '';
    for(let i = 0 ; i< dataProducts.length;i++){
        table += ` 
            <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>

        `
    }

    document.getElementById('tbody').innerHTML = table ; 

    let btnDeleteAll = document.getElementById('btnDeleteAll');

    if(dataProducts.length > 0){
        btnDeleteAll.innerHTML = `
        <button onclick="deleteAll()">delete All ( ${dataProducts.length} )</button>
        `
    }
    else{
        btnDeleteAll.innerHTML = '';
    }
}
showData(); 

//! delete data 

function deleteData(i){ 

    dataProducts.splice(i,1); 
    localStorage.product = JSON.stringify(dataProducts);
    showData(); 
}

//!  delete all data 

function deleteAll(){

    localStorage.clear();
    dataProducts.splice(0);
    showData();
}
//! update data 

function updateData(i){
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    getTotle();
    count.style.display = 'none'; 
    category.value = dataProducts[i].category;

    createBtn.innerHTML = 'Update'; 
    mood = 'update' ;
    tmp = i ;

    scroll({
        top: 0,
        behavior :'smooth',
    })
}

//! search

let searchMood = 'title';


function getSearchMood(id){

    let search = document.getElementById('search');

    if (id === 'searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood = 'category';
    }
    search.placeholder = 'search by ' + searchMood ;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){

    let table = '';
    for(let i = 0 ; i <  dataProducts.length ; i++){
        if(searchMood == 'title'){
       
            if(dataProducts[i].title.includes(value.toLowerCase())){
                table += ` 
                <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
    
            `
            }
        }

        else{
            if(dataProducts[i].category.includes(value.toLowerCase())){
                table += ` 
                <tr>
                    <td>${i}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
    
            `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table ; 
}

// End the program 









