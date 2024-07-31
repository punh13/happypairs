window.addEventListener('DOMContentLoaded', () => {
  const productsAll = JSON.parse(localStorage.getItem('products')) || [];
  const checkoutDetails = document.getElementById('checkout-details');
  const yourCartElement = document.createElement('div');
  
  yourCartElement.classList.add('your-cart');
  
  if (productsAll.length > 0) {
    yourCartElement.innerHTML = '<h1>Your Socks</h1>';
  } else {
    yourCartElement.style.display = 'none'
  }
  
  productsAll.forEach((prod) => {
    if (prod) {
      yourCartElement.innerHTML += `  
        <div class="your-cart__product">
          <img src="${prod.img}" alt="${prod.name}" />
          <h2>${prod.name}</h2>
          <p>$${(prod.price * prod.quantity).toFixed(2)}</p>
        </div>
      `;
    }
  });
  
  checkoutDetails.appendChild(yourCartElement);
  updateCartItemNumbers();
});

