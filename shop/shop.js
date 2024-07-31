window.addEventListener('DOMContentLoaded', async () => {
  const productList = document.querySelector('.products');
  const allProductList = await getProducts();

  const renderProducts = (productsToRender = allProductList) => {
    productList.innerHTML = ''; // Clear the product list

    productsToRender.forEach((product) => {
      const newList = document.createElement('li'); 
      newList.classList.add('products-info');
      newList.setAttribute('data-gender', product.gender);
      newList.innerHTML = `
        <img src="${product.img}" >
        <div backdrop-id="${product.id}" class="products-info__backdrop">
          <h1 class="test">${product.name}</h1>
          <p>$ ${product.price}.00</p>
          <button id="${product.id}">Add to cart</button>
        </div>
      `;

      productList.appendChild(newList);
    });

    const products = document.querySelectorAll('.products-info');
    const productBackdrop = document.querySelectorAll('.products-info__backdrop');

    products.forEach((product, index) => {
      product.addEventListener('mouseover', () =>
        productBackdrop[index].classList.add('active')
      );

      product.addEventListener('mouseleave', () =>
        productBackdrop[index].classList.remove('active')
      );
    });

    const addToCartBtns = document.querySelectorAll('.products-info__backdrop button');
    addToCartBtns.forEach((btn) =>
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const prodId = btn.getAttribute('id');
        const product = allProductList.find((p) => p.id == prodId);
        let productsAll = JSON.parse(localStorage.getItem('products')) || [];

        let isExists = false;
        productsAll = productsAll.map((prod) => {
          if (prod.id == product.id) {
            isExists = true;
            prod.quantity++;
          }
          return prod;
        });

        if (!isExists) {
          productsAll.push({ ...product, quantity: 1, size: '35-38' });
        }

        localStorage.setItem('products', JSON.stringify(productsAll));
        updateCartItemNumbers();
      })
    );

    const productBackdropElements = document.querySelectorAll('.products-info__backdrop');
    productBackdropElements.forEach((item) => {
      item.addEventListener('click', () => {
        const prodId = item.getAttribute('backdrop-id');
        console.log(`${prodId}`);
        window.location.href = `../single-product/product.html?id=${prodId}`;
      });
    });
  };


  renderProducts();
  
  const filterByGender = document.getElementById('gender');
  const sortByPrice = document.getElementById('sort-by');
  const filterByColor = document.getElementById('color');
  
  let filters = {
    gender: 'all',
    sortBy: '',
    color: 'all'
  };
  
  const applyFilters = () => {
    let filteredProducts = [...allProductList];
  
    if (filters.gender !== 'all') {
      filteredProducts = filteredProducts.filter(p =>
        p.gender.some(g => g === filters.gender)
      );
    }
  
    if (filters.color !== 'all') {
      filteredProducts = filteredProducts.filter(p =>
        p.color.some(c => c === filters.color)
      );
    }
  
    if (filters.sortBy === 'ascending') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'descending') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
  
    renderProducts(filteredProducts);
  };
  
  
  filterByGender.addEventListener('change', () => {
    filters.gender = gender.value;
    applyFilters();
  });
  
  sortByPrice.addEventListener('change', () => {
    filters.sortBy = sortByPrice.value;
    applyFilters();
  });
  
  filterByColor.addEventListener('change', () => {
    filters.color = filterByColor.value;
    applyFilters();
  });
  
  applyFilters();

  updateCartItemNumbers();
});
