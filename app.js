let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Cappuccino',
        image: '1.PNG',
        price: 120
    },
    {
        id: 2,
        name: 'Flat White',
        image: '2.PNG',
        price: 120
    },
    {
        id: 3,
        name: 'Latte',
        image: '3.PNG',
        price: 220
    },
    {
        id: 4,
        name: 'Espresso',
        image: '4.PNG',
        price: 120
    },
    {
        id: 5,
        name: 'Caffè mocha',
        image: '5.PNG',
        price: 120
    },
    {
        id: 6,
        name: 'Irish Coffee',
        image: '6.PNG',
        price: 120
    },
    {
        id: 7,
        name: 'Turkish Coffee',
        image: 'm7.png',
        price: 120
    },
    {
        id: 8,
        name: 'Caffè mocha',
        image: 'm8.png',
        price: 120
    },
    {
        id: 9,
        name: 'Decaf Coffee',
        image: 'Decaf caffee.png',
        price: 120
    },
    {
        id: 10,
        name: 'Arabica Coffee',
        image: 'arabica coffee.png',
        price: 120
    },
    {
        id: 11,
        name: 'Black Coffee',
        image: 'Black Coffee.png',
        price: 120
    },
    {
        id: 12,
        name: 'Espresso Coffee',
        image: 'Espresso coffee.png',
        price: 120
    }
    
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}