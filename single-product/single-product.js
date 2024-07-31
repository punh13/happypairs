document.addEventListener('DOMContentLoaded', async () => {
  updateCartItemNumbers();
  const singleProductDetails = document.querySelector('.product-details');
  const urlParams = new URLSearchParams(window.location.search);
  const prodId = urlParams.get('id');

  const data = await getProducts();

  if (prodId) {
    const product = data.find((p) => p.id == prodId);
    console.log(product);

    if (product) {
      singleProductDetails.innerHTML = `
        <div class="product-details__img">
          <img src="${product.img}" width="100%" class="main-img" alt="" />
        <div class="small-img-group">
          <div class="small-img">
            <img class="small-img__img" src="${
              product.img
            }" width="100%" alt="" />
          </div>
          <div class="small-img">
            <img class="small-img__img" src="${
              product.img
            }" width="100%" alt="" />
          </div>
          <div class="small-img">
            <img class="small-img__img" src="${
              product.img
            }" width="100%" alt="" />
          </div>
        </div>
        </div>
        <div class="product-details__content">
          <h1>${product.name}</h1>
          <h2>$ ${product.price.toFixed(2)}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta vel
            facilis totam suscipit, culpa qui repudiandae aspernatur illo laborum
            nesciunt quisquam tempora fugiat deleniti veniam cupiditate facere cum
            laboriosam rem!
          </p>
          <div id="product-material" class="product-features">
            <h3>Materials</h3>
          </div>
          <div id="product-size" class="product-features">
            <label for="size">Select Size</label>
            <select id="size">
              <option>35-38</option>
              <option>39-42</option>
              <option>43-46</option>
            </select>
          </div>
          <div id="product-quantity" class="product-features">
            <h3>Quantity</h3>
            <div id="quantity-change">
              <h3 id="quantity">1</h3>
              <i class="bi bi-plus-square" style="color: black; padding: 0"></i>
              <i class="bi bi-dash-square" style="color: black; padding: 0"></i>
            </div>
          </div>
          <button id="add-to-cart-btn">Add to Cart</button>
        </div>`;

      const mainImg = document.querySelector('.main-img');
      const smallImg = document.querySelectorAll('.small-img__img');

      smallImg.forEach((img) => {
        img.addEventListener('click', () => {
          console.log('clicked');
          mainImg.src = img.src;
          console.log(mainImg);
        });
      });

      const quantityElement = document.getElementById('quantity');
      const increaseQuantity = document.querySelector('.bi-plus-square');
      const decreaseQuantity = document.querySelector('.bi-dash-square');

      let quantity = 1;

      increaseQuantity.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;
      });

      decreaseQuantity.addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
        }
      });

      const singleProdAddToCartBtn = document.getElementById('add-to-cart-btn');
      singleProdAddToCartBtn.addEventListener('click', () => {
        const size = document.getElementById('size').value;
        const alertModal = document.querySelector('.alert-modal');
        const alertModalCloseBtn = document.querySelector(
          '.alert-modal button'
        );

        const cart = JSON.parse(localStorage.getItem('products')) || [];
        const existingProduct = cart.find(
          (p) => p.id == product.id && p.size == size
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.push({ ...product, quantity, size });
        }

        alertModal.classList.add('active');

        const autoCloseTimeout = setTimeout(() => {
          alertModal.classList.remove('active');
        }, 2000);

        alertModalCloseBtn.addEventListener('click', () => {
          clearTimeout(autoCloseTimeout);
          alertModal.classList.remove('active');
        });

        localStorage.setItem('products', JSON.stringify(cart));
        updateCartItemNumbers();
      });

      const filteredArray = data.filter((p) =>
        p.color.some((c) => product.color.includes(c))
      );

      const selectedProducts = filteredArray.slice(0, 3);
      const featuredProducts = document.querySelector('.featured-products');
      const newDiv = document.createElement('div');
      newDiv.classList.add('featured-products__img');

      selectedProducts.forEach((product) => {
        newDiv.innerHTML += `
        <img src="${product.img}" >
  `;
      });
      featuredProducts.appendChild(newDiv);
    }
  }
});
