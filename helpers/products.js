module.exports.productsNewPrice = (products) => {
  const newProducts = products.map(item => {
    item.newPrice = (item.price * ((100 - item.discountPercentage) / 100)).toFixed();
    return item;
  })

  return newProducts;
}