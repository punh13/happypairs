window.addEventListener('DOMContentLoaded', () => {
  updateCart();
});

const updateCart = () => {
  const productsAll = JSON.parse(localStorage.getItem('products')) || [];
  const productsTable = document.querySelector('.table');
  const tableBody = document.createElement('tbody');
  const checkOutBlock = document.querySelector('.checkout-btn');
  const totalPriceElement = document.getElementById('total-price');
  let totalCartPrice = 0;

  productsAll.forEach((prod) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
            <td class="cart-table__product">
              <div class="cart-table__product--info">
                <img src="${prod.img}" />
                <div>
                  <h2>${prod.name}</h2>
                  <p>Price: <span>$${prod.price.toFixed(2)}</span></p>
                  <a class="remove-btn" data-id="${prod.id}" data-size="${
      prod.size
    }">Remove</a>
                </div>
              </div>
            </td>
            <td>
              <select>
                <option disabled selected> ${prod.size}</option>
              </select>
            </td>
            <td>
              <input type="number" value="${
                prod.quantity
              }" class="quantity-input" input-id="${prod.id}" min="1" />
            </td>
            <td class="item-total">$${(prod.price * prod.quantity).toFixed(
              2
            )}</td>`;

    tableBody.appendChild(newRow);
    totalCartPrice += prod.price * prod.quantity;
  });

  productsTable.innerHTML = '';
  productsTable.appendChild(tableBody);

  totalPriceElement.textContent = `$${totalCartPrice.toFixed(2)}`;

  checkOutBlock.style.display = productsAll.length > 0 ? 'block' : 'none';

  removeAndInputBtnHandler();
  updateCartItemNumbers();
};

const removeAndInputBtnHandler = () => {
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const prodId = btn.getAttribute('data-id');
      const prodSize = btn.getAttribute('data-size');

      let productsAll = JSON.parse(localStorage.getItem('products')) || [];
      productsAll = productsAll.filter(
        (prod) => !(prod.id == prodId && prod.size == prodSize)
      );

      localStorage.setItem('products', JSON.stringify(productsAll));

      updateCart();
    });
  });

  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      const prodId = event.target.getAttribute('input-id');
      let productsAll = JSON.parse(localStorage.getItem('products')) || [];
      const index = productsAll.findIndex((prod) => prod.id == prodId);
      const newQuantityValue = parseInt(event.target.value, 10);
      if (newQuantityValue > 0) {
        productsAll[index].quantity = newQuantityValue;
        const productTotalPrice = event.target
          .closest('tr')
          .querySelector('.item-total');
        productTotalPrice.textContent = `$${(
          productsAll[index].price * newQuantityValue
        ).toFixed(2)}`;
        localStorage.setItem('products', JSON.stringify(productsAll));
        updateCart();
      }
    });
  });
};
document.querySelector('#checkout-btn').addEventListener('click', () => {
  window.location.href = '../checkout/checkout.html';
});
