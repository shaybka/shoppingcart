
let cartIcon = document.querySelector('.icon-cart')
let cartItemsTab = document.querySelector('.cart-items-list')
let closeCartTab = document.querySelector('.close');
let cartitemstotal=document.querySelector('.cart-items-total')
let listCartitems =document.querySelector('.listCart')
let totalCost = document.querySelector('.totalcost');


let cartItems=[];


cartIcon.addEventListener('click',()=>{
 cartItemsTab.classList.add('cart-items-show');

});
closeCartTab.addEventListener('click',()=>{
 cartItemsTab.classList.remove('cart-items-show');

});


let addtothecartbtn= document.querySelectorAll('.addtocart')
addtothecartbtn.forEach(
    btn=> {
        btn.addEventListener('click',()=>{
            let parentElement = btn.parentElement;
            const product = {
                
                name: parentElement.querySelector(".productname").innerText,
                image: parentElement.querySelector(".procudt_image").getAttribute("src"),
                price: parentElement.querySelector(".price").innerText.replace("$", ""),
                quantity: 1
            };
         
            let isInCart = cartItems.filter(item => item.name === product.name).length > 0;
            if (!isInCart) {
                addItemToTheDOM(product);
                cartItems.push(product);
            } else {
                alert('already in the cart')
                return;
            }
            calculateTotal();

        })
    }
)




// function addItemToTheDOM(product) {
//     listCartitems.insertAdjacentHTML('afterbegin', ` 
//     <div class="cart-item">
//     <div class="image">
//         <img src="${product.image}">
//     </div>
//     <div class="name">
//      ${product.name}
//     </div>
//     <div class="totalPrice">${product.price}</div>
//     <div class="quantity">
//         <span class="minus"><</span>
//         <span class="qty">1</span>
//         <span class="plus">></span>
       
//     </div>
//     </div>
// `)
// let minusButton = document.querySelector('.minus');
// let plusButton = document.querySelector('.plus');
// let quantitySpan = document.querySelector('.qty');


// minusButton.addEventListener('click', () => {
//     let quantity = quantitySpan.textContent;
//     let productName = event.target.dataset.productName; 
//     if (quantity > 1) {
//         quantity--;
//         quantitySpan.textContent = quantity;
//         updateQuantity(product.name, quantity);
//     }
//     else  {
//         removeItem(product)
//     }
  

// });



// plusButton.addEventListener('click', (event) => {
//     let quantity = quantitySpan.textContent;
//     let productName = event.target.dataset.productName; 
//     quantity++;
//     quantitySpan.textContent = quantity;
//     updateQuantity(productName, quantity); 
// });


// }
function addItemToTheDOM(product) {
    listCartitems.insertAdjacentHTML('afterbegin', ` 
    <div class="cart-item">
        <div class="image">
            <img src="${product.image}">
        </div>
        <div class="name">
            ${product.name}
        </div>
        <div class="totalPrice">${product.price}</div>
        <div class="quantity">
            <span class="minus">-</span>
            <span class="qty">1</span>
            <span class="plus">+</span>
        </div>
    </div>
`);

    // Add event listeners for the newly added plus and minus buttons
    let minusButtons = document.querySelectorAll('.cart-item .minus');
    let plusButtons = document.querySelectorAll('.cart-item .plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            let quantitySpan = button.nextElementSibling; // Get the quantity span next to the clicked minus button
            let quantity = parseInt(quantitySpan.textContent); // Get the current quantity
            if (quantity > 1) {
                quantity--; // Decrease quantity if it's greater than 1
                quantitySpan.textContent = quantity; // Update the displayed quantity
                updateQuantity(product.name, quantity); // Update quantity in the cartItems array
            } else {
                removeItem(product); // Remove the item if quantity becomes 0
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            let quantitySpan = button.previousElementSibling; // Get the quantity span previous to the clicked plus button
            let quantity = parseInt(quantitySpan.textContent); // Get the current quantity
            quantity++; // Increase quantity
            quantitySpan.textContent = quantity; // Update the displayed quantity
            updateQuantity(product.name, quantity); // Update quantity in the cartItems array
        });
    });
}


function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
  
    totalCost.innerText = `total= $${total}`;
    cartitemstotal.innerText = cartItems.length;
}


function updateQuantity(name, quantity) {
    let itemIndex = cartItems.findIndex(item => item.name === name);
    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        calculateTotal();
    }
}


function removeItem(product) {
    // Find index of the product in the cartItems array
    const index = cartItems.findIndex(item => item.name === product.name);
    if (index !== -1) { // If product found in cartItems
        cartItems.splice(index, 1); // Remove the product from cartItems
        // Loop through cart item elements to find the one containing the product name
        const cartItemsElements = document.querySelectorAll('.cart-item');
        cartItemsElements.forEach(cartItem => {
            if (cartItem.querySelector('.name').textContent.trim() === product.name) {
                cartItem.remove(); // Remove the corresponding item from the DOM
                calculateTotal();
            }
        });
    }
}


const checkoutBtn = document.querySelector('.checkOut');
checkoutBtn.addEventListener('click', clearCartItems);



function clearCartItems() {
    alert("Thanks for your shopping!");

    // Clear the cartItems array
    cartItems = [];

    // Remove all cart items from the DOM
    document.querySelectorAll(".cart-item").forEach(node => {
        node.remove();
    });

    // Recalculate the total cost
    calculateTotal();
}
