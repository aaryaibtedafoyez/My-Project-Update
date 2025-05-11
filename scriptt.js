// Sample products JSON
const data = {
    "status": "success",
    "items": [
        { "title": "Light Purple Pendant Earring", "subtitle": "Light Purple Pendant Earring", "price": 500, "image": "products/ex1.jpg" },
        { "title": "Lavender Pendant", "subtitle": "Lavender Pendant", "price": 270, "image": "products/p12.jpg" },
        { "title": "Afterglow M Keychain", "subtitle": "Afterglow M Keychain", "price": 140, "image": "products/p13.jpg" },
        { "title": "Trinity Stone Ring", "subtitle": "Trinity Stone Ring", "price": 300, "image": "products/ex2.jpg" },
        { "title": "Brick Red Amber Earring", "subtitle": "Brick Red Amber Earring", "price": 190, "image": "products/ex3.jpg" },
        { "title": "S Keychain", "subtitle": "S Keychain", "price": 200, "image": "products/ex4.jpg" } // I assigned Tk. 200 to S Keychain (you can edit if needed)
    ]
};

const productDom = document.getElementById('productDom');
const cartContent = document.getElementById('cart-contant');
const itemCounter = document.getElementById('itemCounter');
const totalElement = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCart');

let cart = [];

function renderProducts() {
    data.items.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('card', 'm-2');
        div.style.width = '18rem';
        div.innerHTML = `
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">Price: ${product.price} Tk</p>
                <button class="btn btn-success add-to-cart" data-id="${product.title}">Add to Cart</button>
            </div>
        `;
        productDom.appendChild(div);
    });

    // Attach event listeners to all Add to Cart buttons
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productTitle = btn.getAttribute('data-id');
            addToCart(productTitle);
        });
    });
}

function addToCart(title) {
    const product = data.items.find(item => item.title === title);
    const existing = cart.find(item => item.title === title);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartContent.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.title}</td>
            <td>${item.price} Tk</td>
            <td>Qty: ${item.quantity}</td>
        `;
        cartContent.appendChild(tr);
    });

    itemCounter.textContent = itemCount;
    totalElement.textContent = total;
}

clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Initialize products on page load
renderProducts();
