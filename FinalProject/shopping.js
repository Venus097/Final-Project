  
// zoom-in feature
  
const zoomContainers = document.querySelectorAll('.zoom-container');

zoomContainers.forEach(container => {
  const img = container.querySelector('.zoom-img');   

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Adjust the position of the zoom effect for the image inside each container
    img.style.transformOrigin = `${(x / container.offsetWidth) * 100}% ${(y / container.offsetHeight) * 100}%`;
  });
});







// shrink sidebar when footer appears

const sidebar = document.querySelector('#sidebar');
const footer = document.querySelector('footer');
function shrinkSidebar() {
  let footerHeight = footer.getBoundingClientRect().top;
  let windowHeight = window.innerHeight;

  if(windowHeight >= footerHeight) {
    sidebar.classList.add('shrink');
  }
    else{
      sidebar.classList.remove('shrink');
    }   
}
window.addEventListener('scroll', shrinkSidebar);




 


// cart feature
let localCart = JSON.parse(localStorage.getItem("cart"));
cart = localStorage.getItem("cart") !== null ? localCart : [];

const cartDOM = document.querySelector("#cartContainer");

function addToCart(itemName, itemPrice) {
  const item = { name: itemName, price: itemPrice, quantity: 1 };
  let itemExists = false;

  // Check if the item already exists in the cart
  cart.forEach(obj => {
    if (obj.name === item.name && obj.price === item.price) {
      obj.quantity += 1;  
      itemExists = true;
    }
  });

  if (!itemExists) {
    cart.push(item);
  }
  saveCart();
  updateCartDisplay();
}

// hides and unhides the cart
function toggleCart(){
  cartDOM.classList.toggle("hide");
}
 
function updateCartDisplay() {
  const cartItemsList = document.getElementById("cartItemsList");
  const totalPriceElement = document.getElementById("totalPrice");
  let totalPrice = 0;

  cartItemsList.innerHTML = '';  

  // Add each item to the cart list
  cart.forEach(item => {
     
    const li = document.createElement('li');
    li.classList.add('cart-item');  
     
    // Create the minus(delete item) button
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.classList.add('minus-btn');  
    minusButton.onclick = () => decreaseQuantity(item);  

     
    const itemText = document.createElement('span');
    itemText.innerHTML = `<b>${item.name}</b> - $${item.price} x${item.quantity}`;
    
    
    li.appendChild(minusButton);
    li.appendChild(itemText);
    cartItemsList.appendChild(li);
    
    totalPrice += Math.round(item.price * item.quantity);
    
  });

  totalPriceElement.textContent = `Total: $  ${totalPrice}`;
}
  
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity -= 1;  
  } else {
    cart = cart.filter(cartItem => cartItem !== item);  
  }
  saveCart();
  updateCartDisplay(); 
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartDisplay();
  toggleCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}



updateCartDisplay();














// automate displaying new items in the store using ebay API
function searchEbayMock(keyword) {
  // Mock response data (simulate eBay's API response)
  const mockData = {
      itemSummaries: [
          {
              title: "Wooden Chess Board with Storage",
              price: {
                  value: 25.99,
                  currency: "USD"
              },
              shortDescription: "High-quality wooden chessboard with storage for pieces.",
              image: {
                  imageUrl: "https://example.com/chessboard.jpg"
              }
          }
      ]
  };

  // Simulate actual behavior
  if (mockData && mockData.itemSummaries) {
      const item = mockData.itemSummaries[0];
      return {
          name: item.title,
          price: `${item.price.value} ${item.price.currency}`,
          desc: item.shortDescription || "No description available",
          image: item.image.imageUrl
      };
  }
  return null;
}

function displayShopItems(data){
  let book_section = document.getElementById("book_products");
  data.forEach(item => {
    let item_div = document.createElement("div");
    item_div.classList.add("item");
    item_div.innerHTML = `
       
      <div class="zoom-container">
          <img class="zoom-img" src="${item.image}" alt="Chess Book">
      </div>
      <p>${item.name}</p>
      <p>${item.desc}</p> 
      <button onclick="addToCart('', )">Add to Cart</button>
      <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart <span class="price">- ${item.price}$</span></button>
    `;
    book_section.appendChild(item_div);
  });
}

// Test with a mock keyword
const keyword = "chess board";
const itemInfo = displayShopItems(searchEbayMock(keyword));
console.log(itemInfo);
