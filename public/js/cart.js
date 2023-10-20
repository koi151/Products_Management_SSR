/* Change quantity of product */
const inputQuantities = document.querySelectorAll('[name="quantity"]');
if (inputQuantities) {
  inputQuantities.forEach(input => {
    input.addEventListener("change", (e) => {
      const productId = e.target.getAttribute('product-id');
      const quantity = parseInt(e.target.value);

      if (quantity > 0) {
        window.location.href=`/cart/update/${productId}/${quantity}`
      }
    })
  })
}
/* End change quantity of product */
