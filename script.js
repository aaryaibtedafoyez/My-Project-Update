// Sample products JSON
const data = {
    "status": "success",
    "items": [
        { "id": 1, "title": "Stella Lou Lego Bricks", "price": 280, "image": "product/p10.jpg" },
        { "id": 2, "title": "Stitch Mermaid Eeyore Block", "price": 320, "image": "product/p5.jpg" },
        { "id": 3, "title": "Winnie The Pooh Bricks", "price": 300, "image": "product/p6.jpg" },
        { "id": 4, "title": "Donald Duck Brick Lego", "price": 300, "image": "product/p11.jpg" },
        { "id": 5, "title": "Shellie May Young Pink Bricks", "price": 300, "image": "product/p9.jpg" },
        { "id": 6, "title": "Minnie Mouse Brick Lego", "price": 340, "image": "product/p4.jpg" }
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
                <button class="btn btn-success add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productDom.appendChild(div);
    });

    // Attach event listeners to all Add to Cart buttons
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function addToCart(id) {
    const product = data.items.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

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
