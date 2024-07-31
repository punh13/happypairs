window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('background-color');
  } else {
    header.classList.remove('background-color');
  }
});

const menuBtn = document.querySelector('.menu-btn');
const navbar = document.querySelector('.navbar-items');
const close = document.getElementById('close');

const closeBtn = document.getElementById('close-btn');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navbar.classList.add('active');
  });
}

close.addEventListener('click', () => {
  navbar.classList.remove('active');
});

const updateCartItemNumbers = () => {
  const cartQuantity = document.getElementById('cart-items');
  const mobileCartQuantity = document.getElementById('mobile-cart-items');
  let itemCount = 0;
  let productsAll = JSON.parse(localStorage.getItem('products')) || [];
  productsAll.forEach((prod) => {
    itemCount += prod.quantity;
  });
  cartQuantity.textContent = itemCount;
  mobileCartQuantity.textContent = itemCount;
};

updateCartItemNumbers();

const getProducts = (resource = '../JSON/products.json') => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject('error getting resource');
      }
    });

    request.open('GET', resource);
    request.send();
  });
};
